package com.grouproom.xyz.domain.user.repository;

import com.grouproom.xyz.domain.user.entity.Modifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModifierRepository extends JpaRepository<Modifier, Long> {
    Modifier findBySequence(Long sequence);
}
