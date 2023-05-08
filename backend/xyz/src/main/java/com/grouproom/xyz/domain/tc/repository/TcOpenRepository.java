package com.grouproom.xyz.domain.tc.repository;

import com.grouproom.xyz.domain.tc.entity.TcOpen;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TcOpenRepository extends JpaRepository<TcOpen, Long> {
    Long countTcOpensByTc_Sequence(Long tcSeq);
}
