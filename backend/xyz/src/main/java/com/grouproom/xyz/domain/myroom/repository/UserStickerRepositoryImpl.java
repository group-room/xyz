package com.grouproom.xyz.domain.myroom.repository;

import com.grouproom.xyz.domain.myroom.dto.response.MyRoomResponse;
import com.grouproom.xyz.domain.user.entity.User;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.grouproom.xyz.domain.myroom.entity.QSticker.sticker;
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

    @Override
    public List<MyRoomResponse> selectMyRoomByUserSeq(Long userSeq) {
        return jpaQueryFactory
                .select(
                        Projections.constructor(MyRoomResponse.class
                                , sticker.name
                                , userSticker.sequence
                                , sticker.image
                                , userSticker.xLocation
                                , userSticker.yLocation)
                )
                .from(userSticker)
                .leftJoin(sticker)
                .on(userSticker.sticker.sequence.eq(sticker.sequence))
                .where(userSticker.user.sequence.eq(userSeq))
                .fetch();
    }


}
