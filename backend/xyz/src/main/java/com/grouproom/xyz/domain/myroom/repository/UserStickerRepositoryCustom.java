package com.grouproom.xyz.domain.myroom.repository;

import com.grouproom.xyz.domain.myroom.dto.response.MyRoomResponse;
import com.grouproom.xyz.domain.myroom.dto.response.StickerResponse;
import com.grouproom.xyz.domain.myroom.entity.Sticker;
import com.grouproom.xyz.domain.myroom.entity.UserSticker;
import com.grouproom.xyz.domain.user.entity.User;

import java.util.List;

public interface UserStickerRepositoryCustom {
    void deleteUserStickerByUser(User user);
    List<MyRoomResponse> selectMyRoomByUserSeq(Long userSeq);
}
