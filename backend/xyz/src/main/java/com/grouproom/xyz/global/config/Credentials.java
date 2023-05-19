package com.grouproom.xyz.global.config;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * packageName    : com.grouproom.xyz.global.auth
 * fileName       : Credentials
 * author         : SSAFY
 * date           : 2023-04-20
 * description    : 소셜로그인 키들을 Map으로 세팅해서 관리하기 위함.
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-04-20        SSAFY       최초 생성
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Credentials {

    private String id;

    private String secret;
}