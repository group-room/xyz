package com.grouproom.xyz.domain.tc.repository;

import com.grouproom.xyz.domain.azt.entity.QAzt;
import com.grouproom.xyz.domain.azt.entity.QAztMember;
import com.grouproom.xyz.domain.tc.dto.response.OpenedTcResponse;
import com.grouproom.xyz.domain.tc.dto.response.TcResponse;
import com.grouproom.xyz.domain.tc.entity.OpenStatus;
import com.grouproom.xyz.domain.tc.entity.QTc;
import com.grouproom.xyz.domain.tc.entity.QTcContent;
import com.grouproom.xyz.domain.tc.entity.Tc;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static com.querydsl.core.types.dsl.MathExpressions.*;

@RequiredArgsConstructor
public class TcRepositoryImpl implements TcRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    QTc tc = QTc.tc;
    QAzt azt = QAzt.azt;
    QAztMember aztMember = QAztMember.aztMember;
    QTcContent tcContent = QTcContent.tcContent;

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

    @Override
    public List<TcResponse> findWaitingTcListByUser_Seq(Long userSeq) {

//        return jpaQueryFactory.select(Projections.constructor(WaitingTcResponse.class,
//                        tc.sequence.as("tcSeq"), azt.sequence, azt.aztName, tc.openStatus, tc.openStart, tc.openEnd, tc.location))
//                .from(tc)
//                .join(tc.azt, azt)
//                .join(aztMember)
//                .on(aztMember.azt.eq(azt))
//                .where(aztMember.user.sequence.eq(userSeq))
//                .where(tc.openStatus.in(OpenStatus.OPENED, OpenStatus.OPENABLE, OpenStatus.UPDATABLE))
//                .orderBy(tc.openStart.asc())
//                .fetch();

        return jpaQueryFactory.select(Projections.constructor(TcResponse.class,
                        tc.sequence.as("tcSeq"), tc.azt.sequence, tc.azt.aztName, tc.openStatus, tc.openStart, tc.openEnd, tc.updatedAt, tc.location))
                .from(tc)
                .join(tc.azt, azt)
                .where(azt.sequence.in(JPAExpressions.select(aztMember.azt.sequence)
                        .from(aztMember)
                        .where(aztMember.user.sequence.eq(userSeq))))
                .where(tc.openStatus.in(OpenStatus.LOCKED, OpenStatus.OPENABLE, OpenStatus.UPDATABLE))
                .orderBy(tc.openStart.asc())
                .fetch();
    }

    @Override
    public List<Tc> findTcListByUser_Seq(Long userSeq) {
        return jpaQueryFactory.selectDistinct(tc)
                .from(tc)
                .join(tcContent).on(tc.sequence.eq(tcContent.tc.sequence))
                .where(tcContent.user.sequence.eq(userSeq))
                .orderBy(tc.createdAt.desc())
                .fetch();
    }

    @Override
    public List<Tc> findOpenableTcByUser_SeqAndCoordinates(Long userSeq, BigDecimal latitude, BigDecimal longitude) {

//        일단 1km 반경
        double maxDistance = 1000.0;

        NumberExpression<Double> distanceExpression = acos(sin(radians(Expressions.constant(latitude)))
                .multiply(sin(radians(tc.latitude)))
                .add(cos(radians(Expressions.constant(latitude)))
                        .multiply(cos(radians(tc.latitude)))
                        .multiply(cos(radians(Expressions.constant(longitude)).subtract(
                                radians(tc.longitude))))
                )).multiply(6371000);

        return jpaQueryFactory.selectDistinct(tc)
                .from(tc)
                .join(tcContent).on(tc.sequence.eq(tcContent.tc.sequence))
                .where(tcContent.user.sequence.eq(userSeq))
                .where(distanceExpression.loe(maxDistance))
                .fetch();
    }
}
