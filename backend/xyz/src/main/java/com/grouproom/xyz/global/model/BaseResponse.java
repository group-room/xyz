package com.grouproom.xyz.global.model;

import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * packageName    : com.grouproom.xyz.global.model
 * fileName       : BaseResponse
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
public class BaseResponse<T> {
    private int statusCode;
    private String message;
    private T data;

    public BaseResponse(T body) {
        this.statusCode = HttpStatus.OK.value();
        this.message = "성공";
        this.data = body;
    }

    public BaseResponse(HttpStatus statusCode, String message, T body) {
        this.statusCode = statusCode.value();
        this.message = message;
        this.data = body;
    }
}
