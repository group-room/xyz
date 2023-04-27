package com.grouproom.xyz.domain.user.repository;

import com.grouproom.xyz.domain.user.dto.response.BgmResponse;
import com.grouproom.xyz.domain.user.dto.response.FriendshipResponse;
import com.grouproom.xyz.domain.user.dto.response.ModifierResponse;
import com.grouproom.xyz.domain.user.dto.response.ProfileResponse;
import com.grouproom.xyz.domain.user.entity.SocialType;
import com.grouproom.xyz.domain.user.entity.User;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import static com.grouproom.xyz.domain.friend.entity.QFriend.friend;
import static com.grouproom.xyz.domain.user.entity.QBgm.bgm;
import static com.grouproom.xyz.domain.user.entity.QModifier.modifier;
import static com.grouproom.xyz.domain.user.entity.QNickname.nickname1;
import static com.grouproom.xyz.domain.user.entity.QUser.user;
import static com.grouproom.xyz.domain.user.entity.QUserModifier.userModifier;

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
    public Optional<Long> selectUserBySocialId(SocialType type, String id) {
        return Optional.ofNullable(
                jpaQueryFactory
                        .select(user.sequence)
                        .from(user)
                        .where(user.socialType.eq(type), user.socialIdentify.eq(id))
                        .fetchFirst()
        );

    }

    //소유한 수식어 다 보기
    @Override
    public List<ModifierResponse> selectModifierByUserSeq(Long userSeq) {
        return jpaQueryFactory
                .select(Projections.constructor(ModifierResponse.class, modifier.sequence, modifier.name, modifier.modifierColor, modifier.modifierGrade))
                .from(userModifier)
                .join(userModifier.user, user)
                .join(userModifier.modifier, modifier)
                .where(user.sequence.eq(userSeq))
                .fetch();
    }

    @Override
    public Optional<FriendshipResponse> selectFriendshipByUserSeq(User fromUser, User toUser) {
        BooleanExpression firstCondition = new CaseBuilder().when(friend.fromUser.eq(fromUser).and(friend.isAccepted.eq(false))).then(true).otherwise(false);
        BooleanExpression secondCondition = new CaseBuilder().when(friend.toUser.eq(fromUser).and(friend.isAccepted.eq(false))).then(true).otherwise(false);

        BooleanBuilder builder = new BooleanBuilder();
        builder.or(friend.fromUser.eq(fromUser).and(friend.toUser.eq(toUser)));
        builder.or(friend.fromUser.eq(toUser).and(friend.toUser.eq(fromUser)));

        return Optional.ofNullable(
                jpaQueryFactory
                        .select(Projections.constructor(FriendshipResponse.class, friend.isAccepted, firstCondition, secondCondition, friend.updatedAt))
                        .from(friend)
                        .where(friend.isDeleted.eq(false).and(builder))
                        .fetchFirst()
        );
    }

    @Override
    public Optional<ProfileResponse> selectProfileByUserSeq(User targetUser) {
        return Optional.ofNullable(
                jpaQueryFactory
                        .select(Projections.constructor(ProfileResponse.class,
                                user.nickname,
                                user.visitCount,
                                user.backgroundImage,
                                user.profileImage,
                                user.introduce,
                                modifier.name,
                                modifier.modifierColor,
                                modifier.modifierGrade,
                                user.identify))
                        .from(user)
                        .leftJoin(userModifier)
                        .on(userModifier.user.eq(user).and(userModifier.isSelected.eq(true)))
                        .leftJoin(modifier)
                        .on(userModifier.modifier.eq(modifier))
                        .where(user.eq(targetUser))
                        .fetchFirst()
        );
    }

    @Override
    public List<BgmResponse> selectBgmByUserSeq(User targetUser) {
        return jpaQueryFactory
                .select(Projections.constructor(BgmResponse.class, bgm.title, bgm.link))
                .from(bgm)
                .where(bgm.user.eq(targetUser))
                .fetch();
    }

    @Override
    public Optional<String> selectNicknameByRandom() {
        return Optional.ofNullable(
                jpaQueryFactory
                        .select(nickname1.nickname)
                        .from(nickname1)
                        .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
                        .fetchFirst()
        );
    }

}
