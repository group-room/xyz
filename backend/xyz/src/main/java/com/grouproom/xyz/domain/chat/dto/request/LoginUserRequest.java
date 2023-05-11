package com.grouproom.xyz.domain.chat.dto.request;

import lombok.Getter;

@Getter
public class LoginUserRequest {

    private String user; // email
    private String password; // pass
}
