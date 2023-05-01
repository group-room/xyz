package com.grouproom.xyz.domain.myroom.repository;

import com.grouproom.xyz.domain.myroom.dto.response.StickerResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

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
public class UserStickerRepositoryImpl implements UserStickerRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;
}
