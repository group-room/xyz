package com.grouproom.xyz.domain.chat.controller;

import com.grouproom.xyz.domain.chat.dto.request.ChatDetailRequest;
import com.grouproom.xyz.domain.chat.service.ChatService;
import com.grouproom.xyz.global.model.BaseResponse;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chat-room")
public class ChatController {

    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.chat.controller.ChatController");
    private final ChatService chatService;

    @ApiOperation(value = "채팅 목록 조회", notes = "로그인한 사용자가 소속된 채팅 목록을 반환한다.")
    @GetMapping("/list")
    public BaseResponse<?> chatList() {
        logger.info("chatList 호출");
        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return new BaseResponse<>(chatService.findChat(loginSeq));
    }

    @ApiOperation(value = "채팅 상세 조회", notes = "채팅 상세 정보를 반환한다.")
    @GetMapping
    public BaseResponse<?> chatDetail(@RequestParam String type, @RequestParam Long chatSeq) {
        logger.info("chatDetail 호출");
        ChatDetailRequest chatDetailRequest = ChatDetailRequest.builder()
                .chatSeq(chatSeq)
                .type(type)
                .build();
        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return new BaseResponse<>(chatService.findChat(loginSeq, chatDetailRequest));
    }
}
