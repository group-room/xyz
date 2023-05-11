package com.grouproom.xyz.domain.chat.repository;

import com.grouproom.xyz.domain.chat.dto.response.RoomResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
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

        List<RoomResponse> aztChat = jpaQueryFactory
                .select(Projections.fields(RoomResponse.class,
                        azt.chatSeq.sequence.as("sequence"),
                        azt.aztImage.as("image"),
                        azt.aztName.as("name"),
                        Expressions.as(Expressions.constant("azt"), "type"),
                        aztMember.count().as("count"),
                        azt.sequence.as("aztSeq")
                        )
                )
                .from(azt)
                .join(aztMember)
                .on(azt.eq(aztMember.azt))
                .where(aztMember.user.sequence.eq(loginSeq),
                        aztMember.isDeleted.eq(isDeleted),
                        azt.isDeleted.eq(isDeleted))
                .groupBy(aztMember.azt)
                .fetch();
        List<RoomResponse> rooms = new ArrayList<>();
        rooms.addAll(friendChat);
        rooms.addAll(aztChat);
        return rooms;
    }
}
