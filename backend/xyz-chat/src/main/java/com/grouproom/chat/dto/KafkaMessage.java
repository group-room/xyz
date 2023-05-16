package com.grouproom.chat.dto;

import lombok.*;

/**
 * packageName    : com.example.WebSocketAndKafka
 * fileName       : Message
 * author         : SSAFY
 * date           : 2023-05-09
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-05-09        SSAFY       최초 생성
 */
@Getter
@Setter
@NoArgsConstructor
@ToString
public class KafkaMessage {
    private Long id;
    private String room;
    private String name;
    private String text;
    private String time;

    @Builder
    public KafkaMessage(Long id,String room, String name, String text) {
        this.id = id;
        this.room = room;
        this.name = name;
        this.text = text;
    }
}
