package com.grouproom.xyz.domain.friend.repository;

import com.grouproom.xyz.domain.friend.entity.Friend;
import com.grouproom.xyz.domain.friend.entity.FriendID;
import com.grouproom.xyz.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FriendRepository extends JpaRepository<Friend, FriendID>, FriendRepositoryCustom {

    Friend findByFromUser_SequenceAndToUser_SequenceAndIsAcceptedAndIsCanceledAndIsDeleted(Long from, Long to, Boolean isAccepted, Boolean isCanceled, Boolean isDeleted);
    Friend findByChatSeq_Sequence(Long chatSeq);
    Friend findByFromUserAndToUser(User from, User to);
    Integer deleteByFromUser_SequenceAndToUser_Sequence(Long from, Long to);
}
