package com.grouproom.xyz.domain.tc.repository;

import com.grouproom.xyz.domain.tc.entity.TcContentFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TcContentFileRepository extends JpaRepository<TcContentFile, Long> {

    List<TcContentFile> findByTcContent_Sequence(Long tcContentSeq);
}
