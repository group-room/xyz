package com.grouproom.xyz.domain.user.repository;

import com.grouproom.xyz.domain.user.entity.UserModifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserModifierRepository extends JpaRepository<UserModifier, Long> {
    UserModifier findByUser_SequenceAndModifier_Sequence(Long userSeq,Long modifierSeq);
}
