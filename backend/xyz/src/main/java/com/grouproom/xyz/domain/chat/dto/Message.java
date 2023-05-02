package com.grouproom.xyz.domain.chat.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Message {

    private Long sender;
    private String content;
    private String timestamp;
}
