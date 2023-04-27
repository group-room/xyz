package com.grouproom.xyz.domain.memory.repository;

import com.grouproom.xyz.domain.memory.entity.MemoryLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemoryLikeRepository extends JpaRepository<MemoryLike, Long>, MemoryLikeRepositoryCustom {

    List<MemoryLike> findMemoryLikesByMemory_Sequence(Long memorySeq);
}
