package com.grouproom.xyz.domain.myroom.repository;

import com.grouproom.xyz.domain.myroom.entity.Sticker;
import com.grouproom.xyz.domain.user.entity.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import static com.grouproom.xyz.domain.myroom.entity.QUserSticker.userSticker;

/**
 * packageName    : com.grouproom.xyz.domain.user.repository
 * fileName       : MyRoomRepositoryImpl
 * author         : SSAFY
 * date           : 2023-05-01
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-05-01        SSAFY       최초 생성
 */
@RequiredArgsConstructor
public class UserStickerRepositoryImpl implements UserStickerRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public void deleteUserStickerByUser(User user) {
        jpaQueryFactory.delete(userSticker)
                .where(userSticker.user.eq(user))
                .execute();

    }
}
