package com.grouproom.xyz.domain.friend.repository;

import com.grouproom.xyz.domain.friend.entity.UserBlock;

import java.util.List;

public interface UserBlockRepositoryCustom {

    List<UserBlock> findNicknameByFromUserOrToUser(Long loginSeq, Long userSeq, Boolean isDeleted);
}
