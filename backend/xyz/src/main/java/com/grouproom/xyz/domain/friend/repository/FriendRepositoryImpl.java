package com.grouproom.xyz.domain.friend.repository;

import com.grouproom.xyz.domain.friend.entity.Friend;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import static com.grouproom.xyz.domain.friend.entity.QFriend.friend;

@RequiredArgsConstructor
public class FriendRepositoryImpl implements FriendRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Friend findByFromUserAndToUser1(Long from, Long to) {
        return jpaQueryFactory
                .select(friend)
                .from(friend)
                .where(friend.fromUser.sequence.eq(from),
                        friend.toUser.sequence.eq(to),
                        friend.isAccepted.eq(false),
                        friend.isCanceled.eq(false),
                        friend.isDeleted.eq(false))
                .fetchFirst();
    }
}
