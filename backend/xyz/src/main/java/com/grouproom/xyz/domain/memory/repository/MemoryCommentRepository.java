package com.grouproom.xyz.domain.memory.repository;

import com.grouproom.xyz.domain.memory.entity.MemoryComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemoryCommentRepository extends JpaRepository<MemoryComment, Long>, MemoryCommentRepositoryCustom {

    List<MemoryComment> findByMemory_Sequence(Long memorySeq);
}
