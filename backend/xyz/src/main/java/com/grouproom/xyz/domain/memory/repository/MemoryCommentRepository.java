package com.grouproom.xyz.domain.memory.repository;

import com.grouproom.xyz.domain.memory.entity.MemoryComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface MemoryCommentRepository extends JpaRepository<MemoryComment, Long>, MemoryCommentRepositoryCustom {

    MemoryComment findBySequence(Long sequence);

    List<MemoryComment> findByMemory_Sequence(Long memorySeq);

    List<MemoryComment> findByMemory_SequenceAndIsDeleted(Long memorySeq, boolean isDeleted);

    List<MemoryComment> findByMemory_SequenceAndIsDeletedOrderByCreatedAtDesc(Long memorySeq, Boolean isDeleted);

}
