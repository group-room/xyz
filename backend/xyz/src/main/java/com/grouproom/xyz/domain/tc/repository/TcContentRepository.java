package com.grouproom.xyz.domain.tc.repository;

import com.grouproom.xyz.domain.tc.entity.TcContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TcContentRepository extends JpaRepository<TcContent, Long> {
    List<TcContent> findByTc_Sequence(Long tcSeq);
}
