package com.grouproom.xyz.domain.memory.repository;

import com.grouproom.xyz.domain.memory.entity.Memory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemoryRepository extends JpaRepository<Memory, Long>, MemoryRepositoryCustom {

    Memory findBySequence(Long memorySeq);

    List<Memory> findByUser_SequenceOrderByCreatedAtDesc(Long userSeq);
}
