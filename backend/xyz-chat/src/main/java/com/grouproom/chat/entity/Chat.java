package com.grouproom.chat.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * packageName    : com.example.WebSocketAndKafka.entity
 * fileName       : Chat
 * author         : SSAFY
 * date           : 2023-05-10
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-05-10        SSAFY       최초 생성
 */
@Getter
@Setter
@Document(collection = "chat")
public class Chat {

    @Transient
    public static final String SEQUENCE_NAME = "chat_sequence";

    @Id
    private Long id;
    private String room;
    private String name;
    private String text;
    private String time;

    @Builder
    public Chat(Long id,String room, String name, String text,String time) {
        this.id = id;
        this.room = room;
        this.name = name;
        this.text = text;
        this.time = time;
    }
}
