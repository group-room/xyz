package com.grouproom.xyz.domain.friend.repository;

import com.grouproom.xyz.domain.friend.dto.response.FriendUserResponse;
import com.grouproom.xyz.domain.friend.entity.Friend;

import java.util.List;

public interface FriendRepositoryCustom {

    Friend findByFromUserAndToUser1(Long from, Long to);
    List<FriendUserResponse> findByFromUserOrToUser(Long userSeq, Boolean isAccepted, Boolean isCanceled, Boolean isDeleted);
}
