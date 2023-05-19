package com.grouproom.xyz.domain.azt.repository;

import com.grouproom.xyz.domain.azt.dto.response.AztResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.*;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.grouproom.xyz.domain.azt.entity.QAzt.azt;
import static com.grouproom.xyz.domain.azt.entity.QAztMember.aztMember;

@RequiredArgsConstructor
public class AztRepositoryImpl implements AztRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;
    @Override
    public List<AztResponse> selectAzt(Long loginseq, Boolean isDeleted) {
        return jpaQueryFactory
                .select(Projections.fields(AztResponse.class,
                        azt.sequence.as("aztSeq"),
                        azt.aztImage.as("image"),
                        azt.aztName.as("name"),
                        Expressions.stringPath("DATE_FORMAT(azt.createdAt, '%Y년 %m월 %d일')").as("createdAt"),
                        Expressions.stringPath("DATE_FORMAT(azt.updatedAt, '%Y년 %m월 %d일')").as("updatedAt"),
                        azt.chatSeq.sequence)
                )
                .from(azt)
                .join(aztMember)
                .on(azt.eq(aztMember.azt))
                .where(aztMember.user.sequence.eq(loginseq),
                        aztMember.isDeleted.eq(isDeleted),
                        azt.isDeleted.eq(false))
                .orderBy(azt.createdAt.desc())
                .fetch();
    }
}
