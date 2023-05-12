package com.grouproom.xyz.domain.chat.service;

import com.grouproom.xyz.domain.chat.dto.request.ChatDetailRequest;
import com.grouproom.xyz.domain.chat.dto.response.RoomDetailResponse;
import com.grouproom.xyz.domain.chat.dto.response.RoomsResponse;

public interface ChatService {

    RoomsResponse findChat(Long loginSeq);
    RoomDetailResponse findChat(Long loginSeq, ChatDetailRequest chatDetailRequest);
}
