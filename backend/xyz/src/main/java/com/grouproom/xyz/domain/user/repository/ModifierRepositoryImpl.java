package com.grouproom.xyz.domain.user.repository;

import com.grouproom.xyz.domain.user.entity.Modifier;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

import static com.grouproom.xyz.domain.user.entity.QModifier.modifier;

/**
 * packageName    : com.grouproom.xyz.domain.user.repository
 * fileName       : UserModifierImpl
 * author         : SSAFY
 * date           : 2023-05-17
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-05-17        SSAFY       최초 생성
 */
@RequiredArgsConstructor
public class ModifierRepositoryImpl implements ModifierRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Optional<Modifier> selectModifierByRandom() {
        return Optional.ofNullable(
                jpaQueryFactory
                        .select(modifier)
                        .from(modifier)
                        .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
                        .fetchFirst()
        );
    }
}
