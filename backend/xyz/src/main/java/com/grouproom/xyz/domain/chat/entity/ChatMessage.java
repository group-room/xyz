package com.grouproom.xyz.domain.chat.entity;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class ChatMessage {

    private Long sender;
    private String content;
    private LocalDateTime timestamp;
}
