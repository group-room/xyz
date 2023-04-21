package com.grouproom.xyz.domain.user.repository;

import com.grouproom.xyz.domain.user.entity.SocialType;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

import static com.grouproom.xyz.domain.user.entity.QUser.user;

/**
 * packageName    : com.grouproom.xyz.domain.user.repository
 * fileName       : UserRepositoryImpl
 * author         : SSAFY
 * date           : 2023-04-20
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-04-20        SSAFY       최초 생성
 */
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Optional<Long> findUserBySocialId(SocialType type, String id) {
        return Optional.ofNullable(
                jpaQueryFactory
                        .select(user.sequence)
                        .from(user)
                        .where(user.socialType.eq(type), user.socialIdentify.eq(id))
                        .fetchFirst()
        );

    }
}