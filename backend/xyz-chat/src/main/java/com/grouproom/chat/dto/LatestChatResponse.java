package com.grouproom.chat.dto;

import lombok.*;

/**
 * packageName    : com.grouproom.chat.dto
 * fileName       : AllLatestChatResponse
 * author         : SSAFY
 * date           : 2023-05-15
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-05-15        SSAFY       최초 생성
 */
@Getter
@Setter
@NoArgsConstructor
@ToString
public class LatestChatResponse {
    private String room;
    private String text;
    private String time;

    @Builder
    public LatestChatResponse(String room, String text, String time) {
        this.room = room;
        this.text = text;
        this.time = time;
    }
}
