package com.grouproom.xyz.domain.friend.repository;

import com.grouproom.xyz.domain.friend.entity.UserBlock;
import com.grouproom.xyz.domain.friend.entity.UserBlockID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserBlockRepository extends JpaRepository<UserBlock, UserBlockID>, UserBlockRepositoryCustom {

    UserBlock findByFromUser_SequenceAndToUser_SequenceAndIsDeleted(Long loginSeq, Long userSeq, Boolean isDeleted);
}
