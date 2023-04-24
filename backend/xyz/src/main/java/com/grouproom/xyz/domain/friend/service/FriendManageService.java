package com.grouproom.xyz.domain.friend.service;

import com.grouproom.xyz.global.model.BaseResponse;

public interface FriendManageService {

    // 친구목록조회, 친구끊기, 친구중에 닉네임검색, 친구중에 코드검색
    BaseResponse findFriend(Long loginUserSeq);
    BaseResponse modifyFriendDelete(Long loginSeq, Long userSeq);
}
