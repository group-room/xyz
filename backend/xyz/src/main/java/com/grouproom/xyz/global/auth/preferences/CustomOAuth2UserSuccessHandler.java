package com.grouproom.xyz.global.auth.preferences;

import com.grouproom.xyz.global.auth.jwt.CustomAuthenticatedUser;
import com.grouproom.xyz.global.auth.jwt.JsonWebToken;
import com.grouproom.xyz.global.util.CookieUtils;
import com.grouproom.xyz.global.util.JwtTokenUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.grouproom.xyz.global.auth.preferences.CustomOAuth2CookieAuthorizationRepository.OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME;
import static com.grouproom.xyz.global.auth.preferences.CustomOAuth2CookieAuthorizationRepository.REDIRECT_URI_PARAM_COOKIE_NAME;

/**
 * packageName    : com.grouproom.xyz.global.auth.preferences
 * fileName       : CustomOAuth2UserSuccessHandler
 * author         : SSAFY
 * date           : 2023-04-20
 * description    : 로그인 성공시 -> jwt만들고 쿠키에 담아서, response에 쿠키담아서 전달
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-04-20        SSAFY       최초 생성
 */
@RequiredArgsConstructor
public class CustomOAuth2UserSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        //쿠키에서 기존에 저장된 refresh token을 삭제한다.
        if (CookieUtils.getCookie(request, "refresh-token") != null) {
            CookieUtils.deleteCookie(request, response, "refresh-token");
        }

        //authentication 객체에서 attribute를 추출하고, CustomAuthenticatedUser를 생성한다.
        CustomAuthenticatedUser customAuthenticatedUser = CustomAuthenticatedUser.mapToObj(((DefaultOAuth2User) authentication.getPrincipal()).getAttributes());

        //jwt 토큰을 생성한다.
        JsonWebToken jwtTokenInfo = JwtTokenUtils.allocateToken(customAuthenticatedUser.getUserSeqence(), customAuthenticatedUser.getRole());

        //cookie에서 redirectUrl을 추출하고, redirect 주소를 생성한다.
        String baseUrl = CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME).getValue();
        String url = UriComponentsBuilder.fromUriString(baseUrl).queryParam("token", jwtTokenInfo.getAccessToken()).build().toUriString();

        //쿠키를 삭제한다.
        CookieUtils.deleteCookie(request, response, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME);
        CookieUtils.deleteCookie(request, response, REDIRECT_URI_PARAM_COOKIE_NAME);

        //리다이렉트 시킨다.
        getRedirectStrategy().sendRedirect(request, response, url);
    }

}
