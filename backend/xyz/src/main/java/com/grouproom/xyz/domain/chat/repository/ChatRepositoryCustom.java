package com.grouproom.xyz.domain.chat.repository;

import com.grouproom.xyz.domain.chat.dto.response.RoomDetailResponse;
import com.grouproom.xyz.domain.chat.dto.response.RoomResponse;
import com.grouproom.xyz.domain.user.entity.User;

import java.util.List;

public interface ChatRepositoryCustom {

    List<RoomResponse> selectChats(Long loginSeq, Boolean isDeleted);
    RoomDetailResponse selectAztChat(Long chatSeq);
    List<User> selectAztChatMember(Long chatSeq);
    RoomDetailResponse selectFriendChat(Long loginSeq, Long chatSeq);

}
