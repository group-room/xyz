package com.grouproom.xyz.domain.chat.service;

import com.grouproom.xyz.domain.chat.dto.response.RoomsResponse;

public interface ChatService {

    RoomsResponse findChat(Long loginSeq);
}
