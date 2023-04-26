package com.grouproom.xyz.domain.memory.repository;

import com.grouproom.xyz.domain.azt.entity.QAzt;
import com.grouproom.xyz.domain.azt.entity.QAztMember;
import com.grouproom.xyz.domain.memory.dto.response.MemoryResponse;
import com.grouproom.xyz.domain.memory.entity.Accessibility;
import com.grouproom.xyz.domain.memory.entity.QMemory;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static com.querydsl.core.types.dsl.MathExpressions.*;

@RequiredArgsConstructor
public class MemoryRepositoryImpl implements MemoryRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    QMemory memory = QMemory.memory;
    QAzt azt = QAzt.azt;
    QAztMember aztMember = QAztMember.aztMember;

    private BooleanExpression eqAzt(Long aztSeq) {
        if (aztSeq == null) {
            return null;
        }
        return memory.azt.sequence.eq(aztSeq);
    }

    private BooleanExpression eqDate(LocalDate date) {
        if (date == null) {
            return null;
        }
        return memory.date.between(date.atStartOfDay(), date.atTime(LocalTime.MAX));
    }

    @Override
    public List<MemoryResponse> findByUserSeq(Long userSeq, Long aztSeq, LocalDate date) {

        BooleanBuilder builder = new BooleanBuilder();
        builder.or(memory.accessibility.eq(Accessibility.PUBLIC));
        builder.or(memory.accessibility.eq(Accessibility.GROUP)
                .and(azt.sequence.in(JPAExpressions.select(aztMember.azt.sequence)
                        .from(aztMember)
                        .where(aztMember.user.sequence.eq(userSeq)))));
        builder.or(memory.accessibility.eq(Accessibility.PRIVATE)
                .and(memory.user.sequence.eq(userSeq)));

        return jpaQueryFactory.select(Projections.constructor(MemoryResponse.class,
                        memory.sequence.as("memorySeq"), memory.azt.sequence.as("aztSeq"), memory.azt.aztName, memory.date, memory.latitude, memory.longitude, memory.location))
                .from(memory)
                .join(memory.azt, azt)
                .where(builder)
                .where(eqAzt(aztSeq))
                .where(eqDate(date))
                .where(memory.isDeleted.eq(false))
                .fetch();
    }

    @Override
    public List<MemoryResponse> findByUserSeqAndCoordinate(Long userSeq, Long aztSeq, BigDecimal latitude, BigDecimal longitude, LocalDate date) {

        NumberExpression<Double> distanceExpression = acos(sin(radians(Expressions.constant(latitude)))
                .multiply(sin(radians(memory.latitude)))
                .add(cos(radians(Expressions.constant(latitude)))
                        .multiply(cos(radians(memory.latitude)))
                        .multiply(cos(radians(Expressions.constant(longitude)).subtract(
                                radians(memory.longitude))))
                )).multiply(6371000);

        OrderSpecifier<Double> distanceOrderSpecifier = new OrderSpecifier<>(Order.ASC, distanceExpression);

        BooleanBuilder builder = new BooleanBuilder();
        builder.or(memory.accessibility.eq(Accessibility.PUBLIC));
        builder.or(memory.accessibility.eq(Accessibility.GROUP)
                .and(azt.sequence.in(JPAExpressions.select(aztMember.azt.sequence)
                        .from(aztMember)
                        .where(aztMember.user.sequence.eq(userSeq)))));
        builder.or(memory.accessibility.eq(Accessibility.PRIVATE)
                .and(memory.user.sequence.eq(userSeq)));

        return jpaQueryFactory.select(Projections.constructor(MemoryResponse.class,
                        memory.sequence.as("memorySeq"), memory.azt.sequence.as("aztSeq"), memory.azt.aztName, memory.date, memory.latitude, memory.longitude, memory.location))
                .from(memory)
                .join(memory.azt, azt)
                .where(builder)
                .where(eqAzt(aztSeq))
                .where(eqDate(date))
                .where(memory.isDeleted.eq(false))
                .orderBy(distanceOrderSpecifier)
                .fetch();
    }
}