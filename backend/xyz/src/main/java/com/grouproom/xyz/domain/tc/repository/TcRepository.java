package com.grouproom.xyz.domain.tc.repository;

import com.grouproom.xyz.domain.tc.entity.Tc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TcRepository extends JpaRepository<Tc, Long>, TcRepositoryCustom {

    Tc findBySequence(Long tcSeq);

    List<Tc> findAllByAzt_Sequence(Long aztSeq);
}
