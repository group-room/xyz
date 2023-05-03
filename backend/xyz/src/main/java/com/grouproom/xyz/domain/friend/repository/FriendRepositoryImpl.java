package com.grouproom.xyz.domain.friend.repository;

import com.grouproom.xyz.domain.friend.dto.response.FriendUserResponse;
import com.grouproom.xyz.domain.friend.entity.Friend;
import com.grouproom.xyz.domain.user.entity.QUser;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.grouproom.xyz.domain.friend.entity.QFriend.friend;

@RequiredArgsConstructor
public class FriendRepositoryImpl implements FriendRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    private static final QUser fromUser = friend.fromUser;
    private static final QUser toUser = friend.toUser;

   @Override
    public List<FriendUserResponse> findByFromUserOrToUser(Long userSeq, Boolean isAccepted, Boolean isCanceled, Boolean isDeleted) {

        return jpaQueryFactory
                .select(Projections.fields(FriendUserResponse.class,
                        new CaseBuilder()
                                .when(fromUser.sequence.eq(userSeq))
                                .then(toUser.sequence)
                                .otherwise(fromUser.sequence).as("userSeq"),
                        new CaseBuilder()
                                .when(fromUser.sequence.eq(userSeq))
                                .then(toUser.nickname)
                                .otherwise(fromUser.nickname).as("nickname"),
                        new CaseBuilder()
                                .when(fromUser.sequence.eq(userSeq))
                                .then(toUser.identify)
                                .otherwise(fromUser.identify).as("identify"),
                        new CaseBuilder()
                                .when(fromUser.sequence.eq(userSeq))
                                .then(toUser.profileImage)
                                .otherwise(fromUser.profileImage).as("profileImage"),
                        friend.chatSequence.as("chatSeq")
                        )
                )
                .from(friend)
                .where(fromUser.sequence.eq(userSeq).or(toUser.sequence.eq(userSeq))
                        , friend.isAccepted.eq(isAccepted)
                        , friend.isCanceled.eq(isCanceled)
                        , friend.isDeleted.eq(isDeleted))
                .fetch();
    }

    @Override
    public Friend findByFromUserAndToUser(Long from, Long to, Boolean isAccepted, Boolean isCanceled, Boolean isDeleted) {

        return jpaQueryFactory
                .select(friend)
                .from(friend)
                .where(friend.fromUser.sequence.eq(from).and(friend.toUser.sequence.eq(to))
                        .or(friend.fromUser.sequence.eq(to).and(friend.toUser.sequence.eq(from)))
                        , friend.isAccepted.eq(isAccepted)
                        , friend.isCanceled.eq(isCanceled)
                        , friend.isDeleted.eq(isDeleted))
                .fetchFirst();
    }

    @Override
    public List<FriendUserResponse> findNicknameByFromUserOrToUser(Long userSeq, String nickname, Boolean isAccepted, Boolean isCanceled, Boolean isDeleted) {

        return jpaQueryFactory
                .select(Projections.fields(FriendUserResponse.class,
                                new CaseBuilder()
                                        .when(fromUser.sequence.eq(userSeq))
                                        .then(toUser.sequence)
                                        .otherwise(fromUser.sequence).as("userSeq"),
                                new CaseBuilder()
                                        .when(fromUser.sequence.eq(userSeq))
                                        .then(toUser.nickname)
                                        .otherwise(fromUser.nickname).as("nickname"),
                                new CaseBuilder()
                                        .when(fromUser.sequence.eq(userSeq))
                                        .then(toUser.identify)
                                        .otherwise(fromUser.identify).as("identify"),
                                new CaseBuilder()
                                        .when(fromUser.sequence.eq(userSeq))
                                        .then(toUser.profileImage)
                                        .otherwise(fromUser.profileImage).as("profileImage"),
                        friend.chatSequence.as("chatSeq")
                        )
                )
                .from(friend)
                .where(fromUser.sequence.eq(userSeq).and(toUser.nickname.eq(nickname))
                        .or(toUser.sequence.eq(userSeq).and(fromUser.nickname.eq(nickname)))
                        , friend.isAccepted.eq(isAccepted)
                        , friend.isCanceled.eq(isCanceled)
                        , friend.isDeleted.eq(isDeleted))
                .fetch();
    }

    @Override
    public FriendUserResponse findIdentifyBYFromUserOrToUser(Long userSeq, String identify, Boolean isAccepted, Boolean isCanceled, Boolean isDeleted) {
        return jpaQueryFactory
                .select(Projections.fields(FriendUserResponse.class,
                                new CaseBuilder()
                                        .when(fromUser.sequence.eq(userSeq))
                                        .then(toUser.sequence)
                                        .otherwise(fromUser.sequence).as("userSeq"),
                                new CaseBuilder()
                                        .when(fromUser.sequence.eq(userSeq))
                                        .then(toUser.nickname)
                                        .otherwise(fromUser.nickname).as("nickname"),
                                new CaseBuilder()
                                        .when(fromUser.sequence.eq(userSeq))
                                        .then(toUser.identify)
                                        .otherwise(fromUser.identify).as("identify"),
                                new CaseBuilder()
                                        .when(fromUser.sequence.eq(userSeq))
                                        .then(toUser.profileImage)
                                        .otherwise(fromUser.profileImage).as("profileImage"),
                        friend.chatSequence.as("chatSeq")
                        )
                )
                .from(friend)
                .where(fromUser.sequence.eq(userSeq).and(toUser.identify.eq(identify))
                                .or(toUser.sequence.eq(userSeq).and(fromUser.identify.eq(identify)))
                        , friend.isAccepted.eq(isAccepted)
                        , friend.isCanceled.eq(isCanceled)
                        , friend.isDeleted.eq(isDeleted))
                .fetchFirst();
    }

    @Override
    public Friend findByFromUserOrToUser(Long loginSeq, Long userSeq) {
        return jpaQueryFactory
                .select(friend)
                .from(friend)
                .where(fromUser.sequence.eq(loginSeq).and(toUser.sequence.eq(userSeq))
                        .or(fromUser.sequence.eq(userSeq).and(toUser.sequence.eq(loginSeq))))
                .fetchFirst();
    }
}
