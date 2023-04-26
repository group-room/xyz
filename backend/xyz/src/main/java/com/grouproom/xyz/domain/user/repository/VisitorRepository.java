package com.grouproom.xyz.domain.user.repository;

import com.grouproom.xyz.domain.user.entity.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitorRepository extends JpaRepository<Visitor, Long>,VisitorRepositoryCustom {
}
