package com.grouproom.xyz.domain.tc.repository;

import com.grouproom.xyz.domain.azt.entity.QAzt;
import com.grouproom.xyz.domain.azt.entity.QAztMember;
import com.grouproom.xyz.domain.tc.dto.response.OpenedTcResponse;
import com.grouproom.xyz.domain.tc.entity.OpenStatus;
import com.grouproom.xyz.domain.tc.entity.QTc;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class TcRepositoryImpl implements TcRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    QTc tc = QTc.tc;
    QAzt azt = QAzt.azt;
    QAztMember aztMember = QAztMember.aztMember;

    @Override
    public List<OpenedTcResponse> findOpenedTcListByUser_Seq(Long userSeq) {

        return jpaQueryFactory.select(Projections.constructor(OpenedTcResponse.class,
                        tc.sequence.as("tcSeq"), tc.azt.aztName, tc.updatedAt))
                .from(tc)
                .join(tc.azt, azt)
                .where(azt.sequence.in(JPAExpressions.select(aztMember.azt.sequence)
                        .from(aztMember)
                        .where(aztMember.user.sequence.eq(userSeq))))
                .where(tc.openStatus.eq(OpenStatus.OPENED))
                .orderBy(tc.createdAt.desc())
                .fetch();
    }

    @Override
    public Optional<OpenedTcResponse> findRandomOpenedTcByUser_Seq(Long userSeq) {
        return Optional.ofNullable(
                jpaQueryFactory.select(Projections.constructor(OpenedTcResponse.class,
                                tc.sequence.as("tcSeq"), tc.azt.aztName, tc.updatedAt))
                        .from(tc)
                        .join(tc.azt, azt)
                        .where(azt.sequence.in(JPAExpressions.select(aztMember.azt.sequence)
                                .from(aztMember)
                                .where(aztMember.user.sequence.eq(userSeq))))
                        .where(tc.openStatus.eq(OpenStatus.OPENED))
                        .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
                        .fetchFirst()
        );
    }
}
