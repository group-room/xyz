package com.grouproom.xyz.domain.friend.repository;

import com.grouproom.xyz.domain.friend.entity.Friend;

public interface FriendRepositoryCustom {

    Friend findByFromUserAndToUser1(Long from, Long to);
}
