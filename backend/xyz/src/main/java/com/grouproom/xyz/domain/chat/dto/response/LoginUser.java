package com.grouproom.xyz.domain.chat.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginUser {

    private String userId;
    private String authToken;
}
