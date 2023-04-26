package com.grouproom.xyz.domain.user.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

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
}
