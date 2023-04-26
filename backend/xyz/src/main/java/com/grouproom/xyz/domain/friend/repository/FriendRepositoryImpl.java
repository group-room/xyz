package com.grouproom.xyz.domain.friend.repository;

import com.grouproom.xyz.domain.friend.dto.response.FriendUserResponse;
import com.grouproom.xyz.domain.friend.entity.Friend;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

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

   @Override
    public List<FriendUserResponse> findByFromUserOrToUser(Long userSeq, Boolean isAccepted, Boolean isCanceled, Boolean isDeleted) {
        return jpaQueryFactory
                .select(Projections.fields(FriendUserResponse.class,
                        new CaseBuilder()
                                .when(friend.fromUser.sequence.eq(userSeq))
                                .then(friend.toUser.sequence)
                                .otherwise(friend.fromUser.sequence).as("userSeq"),
                        new CaseBuilder()
                                .when(friend.fromUser.sequence.eq(userSeq))
                                .then(friend.toUser.nickname)
                                .otherwise(friend.fromUser.nickname).as("nickname"),
                        new CaseBuilder()
                                .when(friend.fromUser.sequence.eq(userSeq))
                                .then(friend.toUser.identify)
                                .otherwise(friend.fromUser.identify).as("identify"),
                        new CaseBuilder()
                                .when(friend.fromUser.sequence.eq(userSeq))
                                .then(friend.toUser.profileImage)
                                .otherwise(friend.fromUser.profileImage).as("profileImage")
                        )
                )
                .from(friend)
                .where(friend.fromUser.sequence.eq(userSeq).or(friend.toUser.sequence.eq(userSeq))
                        , friend.isAccepted.eq(isAccepted)
                        , friend.isCanceled.eq(isCanceled)
                        , friend.isDeleted.eq(isDeleted))
                .fetch();
    }
}
