package com.grouproom.xyz.global.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grouproom.xyz.global.exception.ErrorResponse;
import com.grouproom.xyz.global.model.BaseResponse;
import org.springframework.http.HttpStatus;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * packageName    : com.grouproom.xyz.global.util
 * fileName       : JsonUtils
 * author         : SSAFY
 * date           : 2023-04-20
 * description    : 소셜 로그인에서 문제가 생겼을 때, 특정 메세지와 상태를 보내주기 위함
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-04-20        SSAFY       최초 생성
 */
public class JsonUtils {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static void writeJsonExceptionResponse(HttpServletResponse response, HttpStatus httpStatus)
            throws IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");

        ErrorResponse baseResponseDto = new ErrorResponse(httpStatus,"소셜 로그인 부분 오류");

        //json으로 변환하여 response에 저장
        String stringResponseData = objectMapper.writeValueAsString(baseResponseDto);
        response.getWriter().write(stringResponseData);
    }

}