package com.grouproom.xyz.domain.timecapsule.repository;

import com.grouproom.xyz.domain.timecapsule.entity.Timecapsule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimecapsuleRepository extends JpaRepository<Timecapsule, Long>, TimecapsuleRepositoryCustom {

    Timecapsule findBySequence(Long timecapsuleSeq);
}
