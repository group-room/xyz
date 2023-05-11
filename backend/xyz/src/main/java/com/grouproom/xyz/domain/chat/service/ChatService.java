package com.grouproom.xyz.domain.chat.service;

import com.grouproom.xyz.domain.chat.dto.request.LoginUserRequest;
import com.grouproom.xyz.domain.chat.dto.request.PostMessageRequest;
import com.grouproom.xyz.domain.chat.dto.response.ChannelsAndImsResponse;
import com.grouproom.xyz.domain.chat.dto.response.ChannelsResponse;
import com.grouproom.xyz.domain.chat.dto.response.ImsResponse;
import com.grouproom.xyz.domain.chat.dto.response.RoomsResponse;
import org.springframework.http.ResponseEntity;

public interface ChatService {

    ResponseEntity addChatUser(Long userSeq, String nickname, String identify);
    ResponseEntity modifyChatUserToLogin(Long userSeq, LoginUserRequest loginUserRequest);
    ResponseEntity addMessageToChannel(Long userSeq, PostMessageRequest postMessageRequest);
    ChannelsAndImsResponse findChannelAndIm(Long userSeq);
    ChannelsResponse findChannel(Long userSeq);
    ImsResponse findIm(Long userSeq); // 개인 대화방 목록
    RoomsResponse findRoom(Long userSeq);
}
