package com.grouproom.xyz.global.auth.jwt;

import com.grouproom.xyz.domain.user.repository.UserRepository;
import com.grouproom.xyz.global.auth.Constants;
import com.grouproom.xyz.global.exception.ErrorResponse;
import com.grouproom.xyz.global.util.JsonUtils;
import com.grouproom.xyz.global.util.JwtTokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.grouproom.xyz.global.auth.Constants.SECURITY_HTTP_EXCLUDE_URIS;
import static com.grouproom.xyz.global.util.JwtTokenUtils.REFRESH_PERIOD;

/**
 * packageName    : com.grouproom.xyz.global.auth
 * fileName       : JsonWebTokenCheckFilter
 * author         : SSAFY
 * date           : 2023-04-20
 * description    : 요청이 올 때, 여기 필터를 거쳐서 토큰을 확인한다.
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-04-20        SSAFY       최초 생성
 */
@Transactional
public class JsonWebTokenCheckFilter extends OncePerRequestFilter {

    private final AntPathMatcher antPathMatcher = new AntPathMatcher();

    @Autowired
    private JsonWebTokenProvider jsonWebTokenProvider;

    @Autowired
    private UserRepository userRepository;

    private String excludeUrl = Constants.BASE_URI + "/**";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //login 요청의 경우 다음 필터로
//        if (antPathMatcher.match("/**", request.getRequestURI())) {
//            filterChain.doFilter(request, response);
//            return;
//        }
        for (String str : SECURITY_HTTP_EXCLUDE_URIS) {
            if (antPathMatcher.match(str, request.getRequestURI())) {
                filterChain.doFilter(request, response);
                return;
            }
        }

        try {
            String access = JwtTokenUtils.resolveAccessToken(request);      //없으면 에러 throw
            String refresh = JwtTokenUtils.resolveRefreshToken(request);

            if (JwtTokenUtils.isValidToken(access)) { // ACCESS 토큰 유효기간 안지남.
                Authentication authentication = jsonWebTokenProvider.getAuthentication(access); // 정상 토큰이면 SecurityContext 저장
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else if (refresh == null) {// ACCESS 토큰 유효기간 지남.+ REFRESH 없으면 -> 토큰 만료 되었습니다.
                throw new ErrorResponse(HttpStatus.GONE, "Access 토큰의 유효기간이 지났습니다.");
            } else { // ACCESS 토큰 유효기간 지남.+ REFRESH 있음
                if (!JwtTokenUtils.isValidToken(refresh))
                    throw new ErrorResponse(HttpStatus.GONE, "Refresh 토큰의 유효기간이 지났습니다.");

                String userSequence = JwtTokenUtils.getClaimAttribute(refresh, "sequence");
                Long userSequenceValue = Long.parseLong(userSequence);
                if (null == userSequence) throw new ErrorResponse(HttpStatus.FORBIDDEN, "잘못된 Refresh 토큰 입니다. 1");

                String dbToken = userRepository.selectTokenByUserSeq(userSequenceValue)
                        .orElseThrow(() -> new ErrorResponse(HttpStatus.CONFLICT, "저장된 유저가 아닙니다."));

                if (dbToken.equals(refresh)) {
                    String newAccessToken = JwtTokenUtils.changeAccessToken(userSequenceValue, "ROLE_USER");
//                    User user = userRepository.findBySequence(userSequenceValue);


                    Cookie acessCookie = new Cookie("Access", newAccessToken);
                    acessCookie.setMaxAge((int) REFRESH_PERIOD);
                    acessCookie.setPath("/");
                    response.addCookie(acessCookie);


                    Authentication authentication = jsonWebTokenProvider.getAuthentication(newAccessToken); // 정상 토큰이면 SecurityContext 저장

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else {
                    throw new ErrorResponse(HttpStatus.BAD_REQUEST, "잘못된 Refresh 토큰입니다. 2");
                }

            }

        } catch (ErrorResponse e) {
            JsonUtils.writeJsonExceptionResponse(response, e.getHttpStatus(), e.getMessage());
            return;
        }
//        catch (Exception e) {
//            JsonUtils.writeJsonExceptionResponse(response, HttpStatus.CONFLICT, e.getMessage());
//            return;
//        }
        doFilter(request, response, filterChain);
    }
}
