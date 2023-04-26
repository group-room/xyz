package com.grouproom.xyz.global.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * packageName    : com.grouproom.xyz.global.exception
 * fileName       : BaseException
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

@Getter
public class ErrorResponse extends RuntimeException {

    private int statusCode;

    private String message;

    public ErrorResponse(HttpStatus status, String message) {
        this.statusCode = status.value();
        this.message = message;
    }

}