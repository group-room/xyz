package com.grouproom.xyz.domain.user.repository;

import com.grouproom.xyz.domain.user.entity.Bgm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BgmRepository extends JpaRepository<Bgm, Long> {
}
