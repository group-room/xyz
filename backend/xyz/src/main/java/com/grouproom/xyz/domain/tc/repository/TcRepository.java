package com.grouproom.xyz.domain.tc.repository;

import com.grouproom.xyz.domain.tc.entity.Tc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TcRepository extends JpaRepository<Tc, Long>, TcRepositoryCustom {

    Tc findBySequence(Long tcSeq);
}
