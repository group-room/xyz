package com.grouproom.xyz.domain.chat.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUserRequest {

    private String name; // 유저 닉네임
    private String username; // 임시 : 고유코드
    private String email; // 임시 : 고유코드 + @xyz.com
    private String pass; // 임시 : 고유코드 + 랜덤 문자

}
