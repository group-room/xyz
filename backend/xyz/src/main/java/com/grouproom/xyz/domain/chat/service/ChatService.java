package com.grouproom.xyz.domain.chat.service;

import org.springframework.http.ResponseEntity;

public interface ChatService {

    ResponseEntity addChatUser(Long userSeq, String nickname, String identify);
}
