package com.grouproom.xyz.domain.chat.repository;

import com.grouproom.xyz.domain.chat.entity.ChatUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatUserRepository extends JpaRepository<ChatUser, Long> {
}
