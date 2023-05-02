package com.grouproom.xyz.domain.timecapsule.repository;

import com.grouproom.xyz.domain.timecapsule.entity.TimecapsuleContent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimecapsuleContentRepository extends JpaRepository<TimecapsuleContent, Long> {
}
