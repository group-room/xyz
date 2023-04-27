package com.grouproom.xyz.domain.memory.repository;

import com.grouproom.xyz.domain.memory.entity.MemoryLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemoryLikeRepository extends JpaRepository<MemoryLike, Long>, MemoryLikeRepositoryCustom {

    List<MemoryLike> findByMemory_Sequence(Long memorySeq);

    Optional<MemoryLike> findByUser_SequenceAndMemory_Sequence(Long userSeq, Long memorySeq);
}
