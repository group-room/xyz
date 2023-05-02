package com.grouproom.xyz.domain.timecapsule.repository;

import com.grouproom.xyz.domain.timecapsule.entity.Timecapsule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimecapsuleRepository extends JpaRepository<Timecapsule, Long>, TimecapsuleRepositoryCustom {

    Timecapsule findBySequence(Long timecapsuleSeq);
}
