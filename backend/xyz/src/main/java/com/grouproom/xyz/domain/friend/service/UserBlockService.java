package com.grouproom.xyz.domain.friend.service;

import com.grouproom.xyz.domain.friend.dto.response.UserListResponse;

public interface UserBlockService {

    // 차단, 차단해제, 차단목록
    String saveUserBlock(Long loginSeq, Long userSeq);
    String modifySaveBlock(Long loginSeq, Long userSeq);
    UserListResponse findUserBlock(Long loginSeq);
}
