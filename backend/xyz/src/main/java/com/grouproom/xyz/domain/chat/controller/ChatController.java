package com.grouproom.xyz.domain.chat.controller;

import com.grouproom.xyz.domain.chat.dto.request.LoginUserRequest;
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

}
