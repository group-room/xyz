package com.grouproom.xyz.domain.friend.repository;

import com.grouproom.xyz.domain.friend.entity.UserBlock;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import static com.grouproom.xyz.domain.friend.entity.QUserBlock.userBlock;

@RequiredArgsConstructor
public class UserBlockRepositoryImpl implements UserBlockRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public UserBlock findNicknameByFromUserOrToUser(Long loginSeq, Long userSeq, Boolean isDeleted) {
        return jpaQueryFactory
                .select(userBlock)
                .from(userBlock)
                .where(userBlock.fromUser.sequence.eq(loginSeq).and(userBlock.toUser.sequence.eq(userSeq))
                        .or(userBlock.fromUser.sequence.eq(userSeq).and(userBlock.toUser.sequence.eq(loginSeq))
                        )
                , userBlock.isDeleted.eq(isDeleted))
                .fetchFirst();
    }
}
