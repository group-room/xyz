package com.grouproom.xyz.domain.chat.repository;

import com.grouproom.xyz.domain.chat.dto.response.RoomResponse;

import java.util.List;

public interface ChatRepositoryCustom {

    List<RoomResponse> selectChats(Long loginSeq, Boolean isDeleted);

}
