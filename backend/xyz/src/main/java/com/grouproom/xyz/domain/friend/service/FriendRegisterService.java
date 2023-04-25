package com.grouproom.xyz.domain.friend.service;

import com.grouproom.xyz.domain.friend.dto.response.UserListResponse;

public interface FriendRegisterService {

    // 닉네임 검색, 고유 코드 검색, 요청, 요청 취소, 요청 수락
    UserListResponse findUserByNickname(Long loginSeq, String nickname);
    String saveFriendRequest(Long loginSeq, Long userSeq);
}