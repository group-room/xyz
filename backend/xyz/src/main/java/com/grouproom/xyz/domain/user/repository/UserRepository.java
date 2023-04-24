package com.grouproom.xyz.domain.user.repository;

import com.grouproom.xyz.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {
    User findBySequence(Long userSeq);
    User findByIdentify(String identify);
    List<User> findByNickname(String nickname);
}
