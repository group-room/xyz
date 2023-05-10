package com.grouproom.xyz.domain.chat.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterUser {

    private String _id; // user_id
    private String type;
    private String status;
    private String active;
    private String name;
    private String utcOffset;
    private String username;
}
