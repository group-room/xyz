package com.grouproom.xyz.domain.user.repository;

import com.grouproom.xyz.domain.user.dto.response.VisitorResponse;
import com.grouproom.xyz.domain.user.entity.User;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.grouproom.xyz.domain.user.entity.QVisitor.visitor;
import static com.grouproom.xyz.domain.user.entity.QUser.user;
import static com.grouproom.xyz.domain.user.entity.QUserModifier.userModifier;
import static com.grouproom.xyz.domain.user.entity.QModifier.modifier;
/**
 * packageName    : com.grouproom.xyz.domain.user.repository
 * fileName       : VisitorRepositoryImpl
 * author         : SSAFY
 * date           : 2023-04-26
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-04-26        SSAFY       최초 생성
 */
@RequiredArgsConstructor
public class VisitorRepositoryImpl implements VisitorRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<VisitorResponse> selectVisitorByUserSeq(User toUser) {
        return jpaQueryFactory
                .select(Projections.constructor(
                        VisitorResponse.class,
                        user.sequence,
                        visitor.sequence,
                        user.nickname,
                        user.profileImage,
                        modifier.name,
                        modifier.modifierColor,
                        modifier.modifierGrade,
                        visitor.content,
                        visitor.createdAt
                        ))
                .from(visitor)
                .leftJoin(user)
                .on(visitor.fromUser.eq(user))
                .leftJoin(userModifier)
                .on(userModifier.user.eq(user).and(userModifier.isSelected.eq(true)))
                .leftJoin(modifier)
                .on(userModifier.modifier.eq(modifier))
                .where(visitor.toUser.eq(toUser).and(visitor.isDeleted.eq(false)))
                .fetch();
    }
}
