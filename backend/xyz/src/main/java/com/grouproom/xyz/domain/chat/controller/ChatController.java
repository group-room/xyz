package com.grouproom.xyz.domain.chat.controller;

import com.grouproom.xyz.domain.chat.dto.Message;
import com.grouproom.xyz.domain.chat.service.ChatService;
import com.grouproom.xyz.global.model.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.logging.Logger;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chat-room")
public class ChatController {

    private final ChatService chatService;
    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.chat.controller.ChatController");

    @PostMapping(value = "/send", consumes = "application/json", produces = "application/json")
    public BaseResponse sendMessage(@RequestBody Message message) {
        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        logger.info(loginSeq + " sendMessage 호출");
        return new BaseResponse(chatService.sendMessage(loginSeq, message));
    }
}
