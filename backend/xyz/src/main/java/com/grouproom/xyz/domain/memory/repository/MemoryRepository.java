package com.grouproom.xyz.domain.memory.repository;

import com.grouproom.xyz.domain.memory.entity.Memory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemoryRepository extends JpaRepository<Memory, Long>, MemoryRepositoryCustom {
}
