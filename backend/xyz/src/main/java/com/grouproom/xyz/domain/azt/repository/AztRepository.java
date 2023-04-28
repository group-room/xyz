package com.grouproom.xyz.domain.azt.repository;

import com.grouproom.xyz.domain.azt.entity.Azt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AztRepository extends JpaRepository<Azt, Long>, AztRepositoryCustom {
    Azt findBySequence(Long aztSeq);
    Azt findBySequenceAndIsDeleted(Long aztSeq, Boolean isDeleted);
}
