package com.grouproom.xyz.domain.azt.repository;

import com.grouproom.xyz.domain.azt.entity.AztMember;
import com.grouproom.xyz.domain.azt.entity.AztMemberId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AztMemberRepository extends JpaRepository<AztMember, AztMemberId> {
}
