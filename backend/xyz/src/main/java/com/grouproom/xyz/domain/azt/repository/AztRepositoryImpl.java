package com.grouproom.xyz.domain.azt.repository;

import com.grouproom.xyz.domain.azt.dto.response.AztResponse;
import com.querydsl.core.types.Projections;
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
                        azt.createdAt,
                        azt.updatedAt,
                        azt.chatSequence)
                )
                .from(azt)
                .join(aztMember)
                .on(azt.eq(aztMember.azt))
                .where(aztMember.user.sequence.eq(loginseq),
                        aztMember.isDeleted.eq(isDeleted),
                        azt.isDeleted.eq(false))
                .fetch();
    }
}
