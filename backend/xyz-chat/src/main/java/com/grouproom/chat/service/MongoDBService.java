package com.grouproom.chat.service;

import com.grouproom.chat.dto.LatestChatResponse;
import com.grouproom.chat.entity.Chat;

import java.util.List;

/**
 * packageName    : com.example.WebSocketAndKafka.service
 * fileName       : MongoDBService
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

public interface MongoDBService {
    List<Chat> getHistory(String room);
    List<Chat> getHistory(String room,Long id);
    List<Chat> getLatestChat(String name);
}
