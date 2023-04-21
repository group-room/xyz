package com.grouproom.xyz.global.auth.jwt;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

/**
 * packageName    : com.grouproom.xyz.global.auth
 * fileName       : JsonWebToken
 * author         : SSAFY
 * date           : 2023-04-20
 * description    : Json Web Token을 담는 객체
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-04-20        SSAFY       최초 생성
 */
@Data
@Builder
@ToString
@AllArgsConstructor
public class JsonWebToken {

    private String accessToken;

    private String refreshToken;
}
