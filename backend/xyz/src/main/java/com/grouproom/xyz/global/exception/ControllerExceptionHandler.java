package com.grouproom.xyz.global.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * packageName    : com.grouproom.xyz.global.exception
 * fileName       : ControllerExceptionHandler
 * author         : SSAFY
 * date           : 2023-04-20
 * description    : 예상치 못한 오류나 우리가 정한 오류가 나타날 경우 다음과 같이 출력 되도록 설정
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-04-20        SSAFY       최초 생성
 */
@Slf4j
@ControllerAdvice
public class ControllerExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({ErrorResponse.class})
    protected ResponseEntity handleCustomException(ErrorResponse e) {
        log.error("Error occurs {}", e.toString());

        HttpHeaders resHeaders = new HttpHeaders();
        resHeaders.add("Content-Type", "application/json;charset=UTF-8");

        return new ResponseEntity(e.getMessage(), resHeaders, e.getStatus());
    }

    @ExceptionHandler({Exception.class})
    protected ResponseEntity handleServerException(Exception e) {
        log.error("Uncatched Error occurs {}", e.toString());

        HttpHeaders resHeaders = new HttpHeaders();
        resHeaders.add("Content-Type", "application/json;charset=UTF-8");

        return new ResponseEntity(e.getMessage(), resHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
