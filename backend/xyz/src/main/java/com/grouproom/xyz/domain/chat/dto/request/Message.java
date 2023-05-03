package com.grouproom.xyz.domain.chat.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class Message {

    private String roomId;
    private Long sender;
    private String content;
    private LocalDateTime timestamp;
}
