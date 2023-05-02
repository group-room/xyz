package com.grouproom.xyz.domain.timecapsule.repository;

import com.grouproom.xyz.domain.timecapsule.entity.TimecapsuleContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimecapsuleContentRepository extends JpaRepository<TimecapsuleContent, Long> {
    List<TimecapsuleContent> findByTimecapsule_Sequence(Long timecapsuleSeq);
}
