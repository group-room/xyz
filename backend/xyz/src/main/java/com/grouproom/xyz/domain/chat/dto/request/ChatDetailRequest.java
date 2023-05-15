package com.grouproom.xyz.domain.chat.dto.request;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Builder
public class ChatDetailRequest {

    private Long chatSeq; // 채팅 시퀀스
    private String type;
}
