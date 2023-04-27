package com.grouproom.xyz.domain.memory.repository;

import com.grouproom.xyz.domain.memory.entity.MemoryLike;
import com.grouproom.xyz.domain.memory.entity.QMemory;
import com.grouproom.xyz.domain.memory.entity.QMemoryLike;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class MemoryLikeRepositoryImpl implements MemoryLikeRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    QMemory memory = QMemory.memory;
    QMemoryLike memoryLike = QMemoryLike.memoryLike;

    @Override
    public List<MemoryLike> findLikedMemoriesByUserSeq(Long userSeq) {
        return jpaQueryFactory.selectFrom(memoryLike)
                .join(memoryLike.memory, memory)
                .where(memoryLike.user.sequence.eq(userSeq))
                .where(memoryLike.isSelected.eq(true))
                .where(memory.isDeleted.eq(false))
                .fetch();
    }
}