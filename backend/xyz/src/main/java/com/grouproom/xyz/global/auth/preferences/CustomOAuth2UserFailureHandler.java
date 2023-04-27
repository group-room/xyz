package com.grouproom.xyz.global.auth.preferences;

import com.grouproom.xyz.domain.user.entity.SocialType;
import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.domain.user.repository.UserRepository;
import com.grouproom.xyz.global.auth.jwt.JsonWebToken;
import com.grouproom.xyz.global.auth.oauth.CustomOAuth2User;
import com.grouproom.xyz.global.exception.OAuth2LoginException;
import com.grouproom.xyz.global.util.CookieUtils;
import com.grouproom.xyz.global.util.JsonUtils;
import com.grouproom.xyz.global.util.JwtTokenUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.grouproom.xyz.global.auth.preferences.CustomOAuth2CookieAuthorizationRepository.OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME;
import static com.grouproom.xyz.global.auth.preferences.CustomOAuth2CookieAuthorizationRepository.REDIRECT_URI_PARAM_COOKIE_NAME;

/**
 * packageName    : com.grouproom.xyz.global.auth.preferences
 * fileName       : CustomOAuth2UserFailureHandler
 * author         : SSAFY
 * date           : 2023-04-20
 * description    : 로그인 실패시 (혹은 DB에 해당 내용이 없을 시 -> 회원가입 필요)
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-04-20        SSAFY       최초 생성
 */
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CustomOAuth2UserFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    private final UserRepository userRepository;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException {

        // CustomOAuth2UserService에서 발생한 SIGN_UP_REQUIRED 에러가 아닌 경우
        if (!(exception instanceof OAuth2LoginException)) {
            log.error("Uncatched Error occurs {}", exception.getMessage());
            JsonUtils.writeJsonExceptionResponse(response, HttpStatus.BAD_REQUEST,"소셜 로그인 부분 오류");
            return;
        }

        // 회원 가입을 진행하기 위해 CustomOAuth2User를 추출한다.
        CustomOAuth2User customOAuth2User = ((OAuth2LoginException) exception).getCustomOAuth2User();

        // 회원 레코드를 저장한다.
//        QUser user = User.builder()
//                .social(customOAuth2User.getRegistrationId())
//                .socialId(customOAuth2User.getSocialId())
//                .nickname(customOAuth2User.getNickname())
//                .profileImage(customOAuth2User.getProfileImg())
//                .build();`
        User user = User.builder()
                .socialType(customOAuth2User.getRegistrationId())
                .socialIdentify(customOAuth2User.getSocialId())
                .build();

        userRepository.save(user);

        //jwt 토큰을 발급한다.
        JsonWebToken jsonWebToken = JwtTokenUtils.allocateToken(customOAuth2User.getUserSequence(), "ROLE_USER");

        //cookie에서 redirectUrl을 추출하고, redirect 주소를 생성한다.
        String baseUrl = CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME).getValue();
        String url = UriComponentsBuilder.fromUriString(baseUrl)
                .queryParam("token", jsonWebToken.getAccessToken())
                .build().toUriString();

        //쿠키를 삭제한다.
        CookieUtils.deleteCookie(request, response, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME);
        CookieUtils.deleteCookie(request, response, REDIRECT_URI_PARAM_COOKIE_NAME);

        //리다이렉트 시킨다.
        getRedirectStrategy().sendRedirect(request, response, url);

    }


}
