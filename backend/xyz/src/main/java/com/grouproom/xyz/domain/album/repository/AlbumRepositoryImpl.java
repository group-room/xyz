package com.grouproom.xyz.domain.album.repository;

import com.grouproom.xyz.domain.album.dto.response.AlbumResponse;
import com.grouproom.xyz.domain.album.entity.Accessibility;
import com.grouproom.xyz.domain.album.entity.QAlbum;
import com.grouproom.xyz.domain.azt.entity.QAzt;
import com.grouproom.xyz.domain.azt.entity.QAztMember;
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
import java.time.LocalDateTime;
import java.util.List;

import static com.querydsl.core.types.dsl.MathExpressions.*;

@RequiredArgsConstructor
public class AlbumRepositoryImpl implements AlbumRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    QAlbum album = QAlbum.album;
    QAzt azt = QAzt.azt;
    QAztMember aztMember = QAztMember.aztMember;

    private BooleanExpression eqAzt(Long aztSeq) {
        if (aztSeq == null) {
            return null;
        }
        return album.azt.sequence.eq(aztSeq);
    }

    @Override
    public List<AlbumResponse> findAlbumsByUserSeq(Long userSeq, Long aztSeq, LocalDateTime date) {

        BooleanBuilder builder = new BooleanBuilder();
        builder.or(album.accessibility.eq(Accessibility.PUBLIC));
        builder.or(album.accessibility.eq(Accessibility.GROUP)
                .and(azt.sequence.in(JPAExpressions.select(aztMember.azt.sequence)
                        .from(aztMember)
                        .where(aztMember.user.sequence.eq(userSeq)))));
        builder.or(album.accessibility.eq(Accessibility.PRIVATE)
                .and(album.user.sequence.eq(userSeq)));

        return jpaQueryFactory.select(Projections.constructor(AlbumResponse.class,
                        album.sequence.as("albumSeq"), album.accessibility, album.azt.sequence.as("aztSeq"), album.azt.aztName, album.latitude, album.longitude))
                .from(album)
                .join(album.azt, azt)
                .where(builder)
                .where(eqAzt(aztSeq))
                .fetch();
    }

    @Override
    public List<AlbumResponse> findAlbumsByUserSeqAndCoordinate(Long userSeq, Long aztSeq, BigDecimal latitude, BigDecimal longitude, LocalDateTime date) {

        NumberExpression<Double> distanceExpression = acos(sin(radians(Expressions.constant(latitude)))
                .multiply(sin(radians(album.latitude)))
                .add(cos(radians(Expressions.constant(latitude)))
                        .multiply(cos(radians(album.latitude)))
                        .multiply(cos(radians(Expressions.constant(longitude)).subtract(
                                radians(album.longitude))))
                )).multiply(6371000);

        OrderSpecifier<Double> distanceOrderSpecifier = new OrderSpecifier<>(Order.ASC, distanceExpression);

        BooleanBuilder builder = new BooleanBuilder();
        builder.or(album.accessibility.eq(Accessibility.PUBLIC));
        builder.or(album.accessibility.eq(Accessibility.GROUP)
                .and(azt.sequence.in(JPAExpressions.select(aztMember.azt.sequence)
                        .from(aztMember)
                        .where(aztMember.user.sequence.eq(userSeq)))));
        builder.or(album.accessibility.eq(Accessibility.PRIVATE)
                .and(album.user.sequence.eq(userSeq)));

        return jpaQueryFactory.select(Projections.constructor(AlbumResponse.class,
                        album.sequence.as("albumSeq"), album.accessibility, album.azt.sequence.as("aztSeq"), album.azt.aztName, album.latitude, album.longitude))
                .from(album)
                .join(album.azt, azt)
                .where(builder)
                .where(eqAzt(aztSeq))
                .orderBy(distanceOrderSpecifier)
                .fetch();
    }
}