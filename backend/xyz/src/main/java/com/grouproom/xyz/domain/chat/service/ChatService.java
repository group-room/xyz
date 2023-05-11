package com.grouproom.xyz.domain.chat.service;

import com.grouproom.xyz.domain.chat.dto.request.LoginUserRequest;
import com.grouproom.xyz.domain.chat.dto.request.PostMessageRequest;
import org.springframework.http.ResponseEntity;

public interface ChatService {

    ResponseEntity addChatUser(Long userSeq, String nickname, String identify);
    ResponseEntity modifyChatUserToLogin(Long userSeq, LoginUserRequest loginUserRequest);
    ResponseEntity addMessageToChannel(Long userSeq, PostMessageRequest postMessageRequest);
}
