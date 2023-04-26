package com.grouproom.xyz.domain.friend.repository;

import com.grouproom.xyz.domain.friend.entity.UserBlock;

public interface UserBlockRepositoryCustom {

    UserBlock findNicknameByFromUserOrToUser(Long loginSeq, Long userSeq, Boolean isDeleted);
}
