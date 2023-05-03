package com.grouproom.xyz.domain.azt.repository;

import com.grouproom.xyz.domain.azt.entity.AztMember;
import com.grouproom.xyz.domain.azt.entity.AztMemberId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AztMemberRepository extends JpaRepository<AztMember, AztMemberId> {

    AztMember findByAzt_SequenceAndUser_Sequence(Long aztSeq, Long userSeq);
    AztMember findByAzt_SequenceAndUser_SequenceAndIsDeleted(Long aztSeq, Long userSeq, Boolean isDeleted);
    List<AztMember> findByAzt_SequenceAndIsDeleted(Long aztSeq, Boolean isDeleted);
}
