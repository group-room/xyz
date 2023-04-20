package com.grouproom.xyz.global.exception;

import com.grouproom.xyz.global.auth.oauth.CustomOAuth2User;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;

/**
 * packageName    : com.grouproom.xyz.global.exception
 * fileName       : OAuth2LoginException
 * author         : SSAFY
 * date           : 2023-04-20
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-04-20        SSAFY       최초 생성
 */
public class OAuth2LoginException extends OAuth2AuthenticationException {

    private CustomOAuth2User customOAuth2User;

    public OAuth2LoginException(HttpStatus httpStatus, CustomOAuth2User customOAuth2User) {
        super(String.valueOf(httpStatus));
        this.customOAuth2User = customOAuth2User;
    }

    public CustomOAuth2User getCustomOAuth2User() {
        return customOAuth2User;
    }
}

