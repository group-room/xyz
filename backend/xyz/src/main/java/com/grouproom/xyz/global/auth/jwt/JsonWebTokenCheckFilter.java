package com.grouproom.xyz.global.auth.jwt;

import com.grouproom.xyz.global.auth.Constants;
import com.grouproom.xyz.global.exception.ErrorResponse;
import com.grouproom.xyz.global.util.JsonUtils;
import com.grouproom.xyz.global.util.JwtTokenUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.grouproom.xyz.global.auth.Constants.SECURITY_HTTP_EXCLUDE_URIS;

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

public class JsonWebTokenCheckFilter extends OncePerRequestFilter {

    private final AntPathMatcher antPathMatcher = new AntPathMatcher();

    @Autowired
    private JsonWebTokenProvider jsonWebTokenProvider;

    private String excludeUrl = Constants.BASE_URI + "/**";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //login 요청의 경우 다음 필터로
//        if (antPathMatcher.match("/**", request.getRequestURI())) {
//            filterChain.doFilter(request, response);
//            return;
//        }
        for(String str : SECURITY_HTTP_EXCLUDE_URIS){
            if (antPathMatcher.match(str, request.getRequestURI())) {
                filterChain.doFilter(request, response);
                return;
            }
        }

        try {
            String jwt = JwtTokenUtils.resolveAccessToken(request);
            if (jwt != null) {
                if (JwtTokenUtils.isValidToken(jwt)) {
                    Authentication authentication = jsonWebTokenProvider.getAuthentication(jwt); // 정상 토큰이면 SecurityContext 저장
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else {
                    throw new ErrorResponse(HttpStatus.FORBIDDEN,"유효하지 않은 JWT 토큰입니다.");
                }
            }
        } catch (ErrorResponse e) {
            request.setAttribute("exception", e.getStatusCode());
//            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),"유효하지 X");
            JsonUtils.writeJsonExceptionResponse(response,HttpStatus.UNAUTHORIZED,"로그인 되어 있지 않습니다.");
            return;
        }
        doFilter(request, response, filterChain);
    }
}
