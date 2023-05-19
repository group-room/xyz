package com.grouproom.chat.dto;

import lombok.Data;

/**
 * packageName    : com.grouproom.chat.dto
 * fileName       : ChatRequest
 * author         : SSAFY
 * date           : 2023-05-16
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-05-16        SSAFY       최초 생성
 */
@Data
public class ChatRequest {
    private String room;
    private String name;
    private String type;
}
