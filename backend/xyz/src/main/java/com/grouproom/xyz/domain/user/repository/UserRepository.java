package com.grouproom.xyz.domain.user.repository;

import com.grouproom.xyz.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {
    User findBySequence(Long userSeq);
    List<User> findByIdentifyContainingAndSequenceIsNot(String identify, Long loginSeq);
    List<User> findByNicknameContainingAndSequenceIsNot(String nickname, Long loginSeq);
}
