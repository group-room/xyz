package com.grouproom.xyz.domain.timecapsule.repository;

import com.grouproom.xyz.domain.memory.entity.Memory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimecapsuleRepository extends JpaRepository<Memory, Long>, TimecapsuleRepositoryCustom {
}
