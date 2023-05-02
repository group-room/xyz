package com.grouproom.xyz.domain.chat.service;

import com.grouproom.xyz.domain.chat.dto.Message;

public interface ChatService {
    String sendMessage(Long loginSeq, Message message);
}
