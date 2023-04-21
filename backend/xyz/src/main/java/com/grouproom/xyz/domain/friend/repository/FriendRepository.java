package com.grouproom.xyz.domain.friend.repository;

import com.grouproom.xyz.domain.friend.entity.Friend;
import com.grouproom.xyz.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Long> {

    List<Friend> findByFromUserAndIsAcceptedAndIsDeleted(User user, Boolean isAccepted, Boolean isBoolean);
    List<Friend> findByToUserAndIsAcceptedAndIsDeleted(User user, Boolean isAccepted, Boolean isBoolean);
}
