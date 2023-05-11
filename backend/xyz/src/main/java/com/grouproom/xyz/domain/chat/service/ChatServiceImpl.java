package com.grouproom.xyz.domain.chat.service;

import com.grouproom.xyz.domain.chat.dto.response.RoomsResponse;
import com.grouproom.xyz.domain.chat.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;


@RequiredArgsConstructor
@Service
public class ChatServiceImpl implements ChatService {

    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.chat.controller.ChatServiceImpl");
    private final ChatRepository chatRepository;

    @Override
    public RoomsResponse findChat(Long loginSeq) {

        logger.info("findChat 호출");
        
        return RoomsResponse.builder()
                .chats(chatRepository.selectChats(loginSeq, false))
                .build();
    }
}
