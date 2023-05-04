//package com.grouproom.xyz.domain.chat.controller;
//
//import com.grouproom.xyz.domain.chat.dto.request.Message;
//import com.grouproom.xyz.domain.chat.service.ChatService;
//import com.grouproom.xyz.global.config.kafka.KafkaConstants;
//import com.grouproom.xyz.global.model.BaseResponse;
//import lombok.RequiredArgsConstructor;
//import org.springframework.kafka.core.KafkaTemplate;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.Payload;
//import org.springframework.messaging.handler.annotation.SendTo;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.*;
//
//import java.time.LocalDateTime;
//import java.util.logging.Logger;
//
//@RequiredArgsConstructor
//@RestController
//@RequestMapping("/chat-room")
//public class ChatController {
//    private final KafkaTemplate<String, Message> kafkaTemplate;
//    private final ChatService chatService;
//    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.chat.controller.ChatController");
//
////    @GetMapping(produces = "application/json")
////    public BaseResponse ChatRoomsList() {
//////        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
////        logger.info(loginSeq + " ChatRoomsList 호출");
////
////        List<ChatRoom> chatRooms = chatService.findChatRooms(loginSeq);
////        return new BaseResponse(chatRooms);
////    }
//
//    @PostMapping(value = "/send", consumes = "application/json", produces = "application/json")
//    public BaseResponse sendMessage(@RequestBody Message message) {
//        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
////        Long loginSeq = 1L;
//        logger.info(loginSeq + " sendMessage 호출");
//        return new BaseResponse(chatService.sendMessage(loginSeq, message));
//    }
//
//}
