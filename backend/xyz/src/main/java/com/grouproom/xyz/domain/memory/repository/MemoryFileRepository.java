package com.grouproom.xyz.domain.memory.repository;

import com.grouproom.xyz.domain.memory.entity.MemoryFile;
import com.grouproom.xyz.global.model.FileType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemoryFileRepository extends JpaRepository<MemoryFile, Long>, MemoryFileRepositoryCustom {

    List<MemoryFile> findByMemory_Sequence(Long memorySeq);

    MemoryFile findFirstByMemory_SequenceAndIsDeleted(Long memorySeq, Boolean isDeleted);

    List<MemoryFile> findByMemory_SequenceAndIsDeleted(Long memorySeq, Boolean isDeleted);

    List<MemoryFile> findByMemory_SequenceAndIsDeletedAndFileType(Long memorySeq, Boolean isDeleted, FileType fileType);
}
