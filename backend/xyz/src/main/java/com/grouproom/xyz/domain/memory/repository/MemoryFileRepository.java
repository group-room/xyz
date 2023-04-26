package com.grouproom.xyz.domain.memory.repository;

import com.grouproom.xyz.domain.memory.entity.MemoryFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemoryFileRepository  extends JpaRepository<MemoryFile, Long>, MemoryFileRepositoryCustom{
}
