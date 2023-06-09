package com.grouproom.xyz.domain.friend.repository;

import com.grouproom.xyz.domain.friend.dto.response.FriendUserResponse;
import com.grouproom.xyz.domain.friend.entity.Friend;

import java.util.List;

public interface FriendRepositoryCustom {

    List<FriendUserResponse> findByFromUserOrToUser(Long userSeq, Boolean isAccepted, Boolean isCanceled, Boolean isDeleted);
    Friend findByFromUserAndToUser(Long from, Long to, Boolean isAccepted, Boolean isCanceled, Boolean isDeleted);
    List<FriendUserResponse> findNicknameByFromUserOrToUser(Long userSeq, String nickname, Boolean isAccepted, Boolean isCanceled, Boolean isDeleted);
    List<FriendUserResponse> findIdentifyBYFromUserOrToUser(Long userSeq, String identify, Boolean isAccepted, Boolean isCanceled, Boolean isDeleted);

    Friend findByFromUserOrToUser(Long loginSeq, Long userSeq);
}
