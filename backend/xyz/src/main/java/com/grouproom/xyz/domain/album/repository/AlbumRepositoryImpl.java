package com.grouproom.xyz.domain.album.repository;

import com.grouproom.xyz.domain.album.dto.response.AlbumResponse;
import com.grouproom.xyz.domain.album.entity.Accessibility;
import com.grouproom.xyz.domain.album.entity.QAlbum;
import com.grouproom.xyz.domain.azt.entity.QAzt;
import com.grouproom.xyz.domain.azt.entity.QAztMember;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

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
                        album.sequence.as("albumSeq"), album.accessibility, album.azt.sequence.as("aztSeq"), album.azt.aztName))
                .from(album)
                .join(album.azt, azt)
                .where(builder)
                .where(eqAzt(aztSeq))
                .fetch();
    }
}