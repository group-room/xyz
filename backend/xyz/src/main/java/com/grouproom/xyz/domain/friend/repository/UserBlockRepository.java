package com.grouproom.xyz.domain.friend.repository;

import com.grouproom.xyz.domain.friend.entity.UserBlock;
import com.grouproom.xyz.domain.friend.entity.UserBlockID;
import com.grouproom.xyz.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserBlockRepository extends JpaRepository<UserBlock, UserBlockID>, UserBlockRepositoryCustom {

    UserBlock findByFromUserAndToUserAndIsDeleted(User from, User to, Boolean isDeleted);
}
