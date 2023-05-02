package com.grouproom.xyz.domain.timecapsule.repository;

import com.grouproom.xyz.domain.timecapsule.entity.TimecapsuleContentFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimecapsuleContentFileRepository extends JpaRepository<TimecapsuleContentFile, Long> {

    List<TimecapsuleContentFile> findByTimecapsuleContent_Sequence(Long timecapsuleContentSeq);
}
