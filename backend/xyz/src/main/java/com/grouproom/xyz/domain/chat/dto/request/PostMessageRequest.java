package com.grouproom.xyz.domain.chat.dto.request;

import lombok.Getter;

@Getter
public class PostMessageRequest {

    private String channel;
    private String text;
}
