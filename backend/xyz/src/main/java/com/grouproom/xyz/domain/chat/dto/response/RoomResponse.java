package com.grouproom.xyz.domain.chat.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoomResponse {

    // 채팅방 시퀀스, 사진, 이름, 인원수, 아지트시퀀스 또는 친구 시퀀스
    private Long sequence;
    private String image;
    private String name;
    private String type; // 아지트 or 친구
    private Long count; // 인원수
    private Long aztSeq;
    private Long userSeq;

    public RoomResponse(Long sequence, String image, String name, String type, Long count, Long aztSeq) {
        this.sequence = sequence;
        this.image = image;
        this.name = name;
        this.type = type;
        this.count = count;
        this.aztSeq = aztSeq;
    }
}
