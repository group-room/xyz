package com.grouproom.xyz.domain.memory.repository;

import com.grouproom.xyz.domain.memory.entity.MemoryLike;

import java.util.List;

public interface MemoryLikeRepositoryCustom {
    List<MemoryLike> findLikedMemoriesByUserSeq(Long userSeq);

}