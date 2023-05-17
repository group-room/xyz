package com.grouproom.xyz.domain.memory.repository;

import com.grouproom.xyz.domain.memory.entity.MemoryFile;
import com.grouproom.xyz.global.model.FileType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemoryFileRepository extends JpaRepository<MemoryFile, Long>, MemoryFileRepositoryCustom {

    List<MemoryFile> findByMemory_Sequence(Long memorySeq);

    MemoryFile findFirstByMemory_SequenceAndIsDeleted(Long memorySeq, Boolean isDeleted);

    List<MemoryFile> findByMemory_SequenceAndIsDeleted(Long memorySeq, Boolean isDeleted);

    List<MemoryFile> findByMemory_SequenceAndIsDeletedAndFileType(Long memorySeq, Boolean isDeleted, FileType fileType);

    @Modifying(flushAutomatically = true)
    @Query("UPDATE MemoryFile mf SET mf.isDeleted = true WHERE mf.memory.sequence = :memorySeq AND mf.fileType = :fileType AND mf.isDeleted = false")
    void markMemoryFilesAsDeleted(@Param("memorySeq") Long memorySeq, @Param("fileType") FileType fileType);
}
