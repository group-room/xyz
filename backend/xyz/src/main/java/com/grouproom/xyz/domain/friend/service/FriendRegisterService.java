package com.grouproom.xyz.domain.friend.service;

public interface FriendRegisterService {

    // 닉네임 검색, 고유 코드 검색, 요청, 요청 취소, 요청 수락
    String saveFriendRequest(Long loginSeq, Long userSeq);
}
