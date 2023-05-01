package com.grouproom.xyz.domain.myroom.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import static com.grouproom.xyz.domain.myroom.entity.QSticker.sticker;
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
public class StickerRepositoryImpl implements StickerRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public void deleteAllSticker() {
        jpaQueryFactory
                .delete(sticker)
                .execute();
    }
}
