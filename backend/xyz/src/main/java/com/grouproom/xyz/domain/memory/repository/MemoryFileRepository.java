package com.grouproom.xyz.domain.memory.repository;

import com.grouproom.xyz.domain.memory.entity.MemoryFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemoryFileRepository extends JpaRepository<MemoryFile, Long>, MemoryFileRepositoryCustom {

    List<MemoryFile> findByMemory_Sequence(Long memorySeq);

    List<MemoryFile> findByMemory_SequenceAndIsDeleted(Long memorySeq, Boolean isDeleted);

    MemoryFile findFirstByMemory_SequenceAndIsDeleted(Long memorySeq, Boolean isDeleted);
}
