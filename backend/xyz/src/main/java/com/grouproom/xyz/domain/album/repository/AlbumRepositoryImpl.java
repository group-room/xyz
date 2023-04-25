package com.grouproom.xyz.domain.album.repository;

import com.grouproom.xyz.domain.album.dto.response.AlbumResponse;
import com.grouproom.xyz.domain.album.entity.Accessibility;
import com.grouproom.xyz.domain.album.entity.Album;
import com.grouproom.xyz.domain.album.entity.QAlbum;
import com.grouproom.xyz.domain.azt.entity.QAzt;
import com.grouproom.xyz.domain.azt.entity.QAztMember;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import static com.grouproom.xyz.domain.album.entity.QAlbum.album;
import static com.querydsl.core.types.dsl.MathExpressions.*;

@RequiredArgsConstructor
public class AlbumRepositoryImpl implements AlbumRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<AlbumResponse> findAlbumsByUserSeq(Long userSeq, LocalDateTime date) {
        QAlbum album = QAlbum.album;
        QAzt azt = QAzt.azt;
        QAztMember aztMember = QAztMember.aztMember;

        BooleanBuilder builder = new BooleanBuilder();
        builder.or(album.accessibility.eq(Accessibility.PUBLIC));
        builder.or(album.accessibility.eq(Accessibility.GROUP)
                .and(azt.sequence.in(JPAExpressions.select(aztMember.azt.sequence)
                        .from(aztMember)
                        .where(aztMember.user.sequence.eq(userSeq)))));
        builder.or(album.accessibility.eq(Accessibility.PRIVATE)
                .and(album.user.sequence.eq(userSeq)));

        return jpaQueryFactory.select(Projections.constructor(AlbumResponse.class,
                        album.sequence.as("albumSeq"), album.accessibility, album.azt.sequence.as("aztSeq"), album.azt.aztName))
                .from(album)
                .join(album.azt, azt)
                .where(builder)
                .fetch();
    }

    @Override
    public List<Album> findAlbumsByUserSeqAndCoordinate(Long userSeq, BigDecimal latitude, BigDecimal longitude, LocalDateTime date) {
        NumberExpression<Double> distanceExpression = acos(sin(radians(Expressions.constant(latitude)))
                .multiply(sin(radians(album.latitude)))
                .add(cos(radians(Expressions.constant(latitude)))
                        .multiply(cos(radians(album.latitude)))
                        .multiply(cos(radians(Expressions.constant(longitude)).subtract(
                                radians(album.longitude))))
                )).multiply(6371000);
        Path<Double> distancePath = Expressions.numberPath(Double.class, "distance");

        return null;
    }
}