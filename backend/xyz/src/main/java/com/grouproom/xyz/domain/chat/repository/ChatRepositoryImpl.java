package com.grouproom.xyz.domain.chat.repository;

import com.grouproom.xyz.domain.chat.dto.response.RoomDetailResponse;
import com.grouproom.xyz.domain.chat.dto.response.RoomResponse;
import com.grouproom.xyz.domain.user.entity.User;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.SubQueryExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import static com.grouproom.xyz.domain.azt.entity.QAzt.azt;
import static com.grouproom.xyz.domain.azt.entity.QAztMember.aztMember;
import static com.grouproom.xyz.domain.friend.entity.QFriend.friend;


@RequiredArgsConstructor
public class ChatRepositoryImpl implements ChatRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<RoomResponse> selectChats(Long loginSeq, Boolean isDeleted) {
        List<RoomResponse> friendChat = jpaQueryFactory
                .select(Projections.fields(RoomResponse.class,
                                friend.chatSeq.sequence.as("sequence"),
                                new CaseBuilder()
                                        .when(friend.fromUser.sequence.eq(loginSeq))
                                        .then(friend.toUser.profileImage)
                                        .otherwise(friend.fromUser.profileImage).as("image"),
                                new CaseBuilder()
                                        .when(friend.fromUser.sequence.eq(loginSeq))
                                        .then(friend.toUser.nickname)
                                        .otherwise(friend.fromUser.nickname).as("name"),
                        Expressions.as(Expressions.constant("friend"), "type"),
                                new CaseBuilder()
                                        .when(friend.fromUser.sequence.eq(loginSeq))
                                        .then(friend.toUser.sequence)
                                        .otherwise(friend.fromUser.sequence).as("userSeq")
                        )
                )
                .from(friend)
                .where(friend.fromUser.sequence.eq(loginSeq).or(friend.toUser.sequence.eq(loginSeq)))
                .fetch();

        SubQueryExpression<Long> countSubQuery = JPAExpressions
                .select(aztMember.count())
                .from(aztMember)
                .where(aztMember.azt.eq(azt));

        List<RoomResponse> aztChat = jpaQueryFactory
                .select(Projections.constructor(
                        RoomResponse.class,
                        azt.chatSeq.sequence,
                        azt.aztImage,
                        azt.aztName,
                        Expressions.constant("azt"),
                        countSubQuery,
                        azt.sequence
                ))
                .from(azt)
                .join(aztMember)
                .on(azt.eq(aztMember.azt))
                .where(aztMember.user.sequence.eq(loginSeq),
                        aztMember.isDeleted.eq(isDeleted),
                        azt.isDeleted.eq(isDeleted))
                .fetch();
        List<RoomResponse> rooms = new ArrayList<>();
        rooms.addAll(friendChat);
        rooms.addAll(aztChat);
        return rooms;
    }

    @Override
    public RoomDetailResponse selectAztChat(Long chatSeq) {

        return jpaQueryFactory
                .select(Projections.fields(RoomDetailResponse.class,
                                azt.chatSeq.sequence.as("chatSeq"),
                                azt.aztName.as("name"),
                                Expressions.as(Expressions.constant("azt"), "type"),
                                azt.sequence.as("aztSeq")//,
                        )
                )
                .from(azt)
                .where(azt.chatSeq.sequence.eq(chatSeq))
                .fetchFirst();
    }

    @Override
    public List<User> selectAztChatMember(Long chatSeq) {

        return jpaQueryFactory
                .select(aztMember.user)
                .from(aztMember)
                .join(aztMember.azt, azt)
                .where(azt.chatSeq.sequence.eq(chatSeq))
                .fetch();
    }

    @Override
    public RoomDetailResponse selectFriendChat(Long loginSeq, Long chatSeq) {

        return jpaQueryFactory
                .select(Projections.fields(RoomDetailResponse.class,
                                friend.chatSeq.sequence.as("chatSeq"),
                        new CaseBuilder()
                                .when(friend.fromUser.sequence.eq(loginSeq))
                                .then(friend.toUser.nickname)
                                .otherwise(friend.fromUser.nickname).as("name"),
                                Expressions.as(Expressions.constant("friend"), "type"),
                        new CaseBuilder()
                                .when(friend.fromUser.sequence.eq(loginSeq))
                                .then(friend.toUser.sequence)
                                .otherwise(friend.fromUser.sequence).as("userSeq")
                        )
                )
                .from(friend)
                .where(friend.chatSeq.sequence.eq(chatSeq))
                .fetchFirst();
    }
}
