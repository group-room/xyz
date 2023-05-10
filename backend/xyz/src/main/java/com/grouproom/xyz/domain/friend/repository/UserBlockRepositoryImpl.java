package com.grouproom.xyz.domain.friend.repository;

import com.grouproom.xyz.domain.friend.dto.response.UserResponse;
import com.grouproom.xyz.domain.friend.entity.UserBlock;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.grouproom.xyz.domain.friend.entity.QUserBlock.userBlock;

@RequiredArgsConstructor
public class UserBlockRepositoryImpl implements UserBlockRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<UserBlock> findNicknameByFromUserOrToUser(Long loginSeq, Long userSeq, Boolean isDeleted) {
        return jpaQueryFactory
                .select(userBlock)
                .from(userBlock)
                .where(userBlock.fromUser.sequence.eq(loginSeq).and(userBlock.toUser.sequence.eq(userSeq))
                        .or(userBlock.fromUser.sequence.eq(userSeq).and(userBlock.toUser.sequence.eq(loginSeq))
                        )
                , userBlock.isDeleted.eq(isDeleted))
                .fetch();
    }

    @Override
    public List<UserResponse> findByFromUserAndIsDeleted(Long loginSeq, Boolean isDeleted) {
        String blocked = "차단함";
        return jpaQueryFactory
                .select(Projections.fields(UserResponse.class,
                        userBlock.toUser.sequence.as("userSeq"),
                        userBlock.toUser.profileImage.as("profileImage"),
                        userBlock.toUser.nickname.as("nickname"),
                        userBlock.toUser.identify.as("identify"),
                        Expressions.as(Expressions.constant(blocked), "relation")
                        )
                )
                .from(userBlock)
                .where(userBlock.fromUser.sequence.eq(loginSeq)
                , userBlock.isDeleted.eq(isDeleted))
                .fetch();
    }
}
