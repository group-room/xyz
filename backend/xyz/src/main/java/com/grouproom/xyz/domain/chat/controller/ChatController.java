package com.grouproom.xyz.domain.chat.controller;

import com.grouproom.xyz.domain.chat.dto.request.LoginUserRequest;
import com.grouproom.xyz.domain.chat.dto.request.PostMessageRequest;
import com.grouproom.xyz.domain.chat.service.ChatService;
import com.grouproom.xyz.global.model.BaseResponse;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.logging.Logger;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chat-room")
public class ChatController {

    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.chat.controller.ChatController");
    private final ChatService chatService;

    @ApiOperation(value = "로켓챗 가입", notes = "로켓챗에 가입한다.")
    @PostMapping ("/register")
    public BaseResponse registerChatUser(@RequestBody Map<String, String> map) {
        logger.info("registerChatUser 호출");
        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return new BaseResponse(chatService.addChatUser(loginSeq, map.get("nickname"), map.get("identify")));
    }

    @ApiOperation(value = "로켓챗 로그인", notes = "로켓챗에 로그인한다.")
    @PostMapping ("/login")
    public BaseResponse loginChatUser(@RequestBody LoginUserRequest loginUserRequest) {
        logger.info("loginChatUser 호출");
        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return new BaseResponse(chatService.modifyChatUserToLogin(loginSeq, loginUserRequest));
    }

    @ApiOperation(value = "채널에 메시지 전송", notes = "로켓챗 채널에 메시지를 보낸다.")
    @PostMapping ("/channel")
    public BaseResponse addMessageToChannel(@RequestBody PostMessageRequest postMessageRequest) {
        logger.info("addMessageToChannel 호출");
        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return new BaseResponse(chatService.addMessageToChannel(loginSeq, postMessageRequest));
    }

    @ApiOperation(value = "채널 및 대화방 목록 조회", notes = "본인이 소속된 채널 및 대화방 목록을 가져온다.")
    @GetMapping
    public BaseResponse channelAndImList() {
        logger.info("channelAndImList 호출");
        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return new BaseResponse(chatService.findChannelAndIm(loginSeq));
    }

//    @ApiOperation(value = "채널 목록 조회", notes = "본인이 소속된 채널 목록을 가져온다.")
//    @GetMapping ("/channel")
//    public BaseResponse channelList() {
//        logger.info("channelList 호출");
//        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
//        return new BaseResponse(chatService.findChannel(loginSeq));
//    }
//
//    @ApiOperation(value = "개인 대화방 목록 조회", notes = "본인이 소속된 대화방 목록을 가져온다.")
//    @GetMapping ("/im")
//    public BaseResponse imList() {
//        logger.info("imList 호출");
//        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
//        return new BaseResponse(chatService.findIm(loginSeq));
//    }
}
