package com.grouproom.xyz.domain.user.repository;

import com.grouproom.xyz.domain.user.entity.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import static com.grouproom.xyz.domain.user.entity.QUserModifier.userModifier;
/**
 * packageName    : com.grouproom.xyz.domain.user.repository
 * fileName       : UserModifierRepositoryImpl
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
public class UserModifierRepositoryImpl implements UserModifierRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public void updateAntotherModifierSet(User user) {
        jpaQueryFactory.update(userModifier)
                .set(userModifier.isSelected,false)
                .where(userModifier.user.eq(user))
                .execute();
    }
}
