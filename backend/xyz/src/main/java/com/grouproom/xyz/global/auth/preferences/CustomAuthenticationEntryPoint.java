package com.grouproom.xyz.global.auth.preferences;

import com.grouproom.xyz.global.util.JsonUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * packageName    : com.grouproom.xyz.global.auth.preferences
 * fileName       : CustomAuthenticationEntryPoint
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
//Spring Security 내에서 전역적으로 사용되는 EntryPoint
//authenticate 과정에서 에러가 발생하면 (anonymous user일 경우) ExceptionTranslationFilter에서 넘어옴
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {

        if (authException instanceof InsufficientAuthenticationException) {
            JsonUtils.writeJsonExceptionResponse(response, HttpStatus.BAD_REQUEST,"소셜 로그인 부분 오류");
        }

    }
}

