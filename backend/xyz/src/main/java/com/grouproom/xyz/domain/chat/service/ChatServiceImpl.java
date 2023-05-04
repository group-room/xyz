//package com.grouproom.xyz.domain.chat.service;
//
//import com.grouproom.xyz.domain.chat.dto.request.Message;
//import com.grouproom.xyz.domain.chat.entity.ChatMessage;
//import com.grouproom.xyz.domain.chat.entity.ChatRoom;
//import com.grouproom.xyz.domain.chat.repository.ChatRoomRepository;
//import com.grouproom.xyz.domain.chattest.service.ChatService;
//import com.grouproom.xyz.global.config.kafka.KafkaConstants;
//import com.grouproom.xyz.global.exception.ErrorResponse;
//import lombok.RequiredArgsConstructor;
//import org.bson.types.ObjectId;
//import org.springframework.http.HttpStatus;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.kafka.core.KafkaTemplate;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.Payload;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.stereotype.Service;
//
//import javax.transaction.Transactional;
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.concurrent.ExecutionException;
//import java.util.logging.Logger;
//
//@RequiredArgsConstructor
//@Service
//public class ChatServiceImpl implements ChatService {
//
//    private final SimpMessagingTemplate messagingTemplate;
//    private final KafkaTemplate<String, Message> kafkaTemplate;
//    private final ChatRoomRepository chatRoomRepository;
//    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.chat.service.ChatServiceImpl");
//
////    @Override
////    public List<ChatRoom> findChatRooms(Long loginSeq) {
////        logger.info("findChatRooms 호출");
////        logger.info("친구와의 채팅 목록");
////        logger.info("아지트 채팅 목록");
////        // 채팅 목록 반환해야 함
////        return null;
////    }
//
//    @Override
//    public String sendMessage(Long loginSeq, Message message) {
//        message.setSender(loginSeq);
//        message.setTimestamp(LocalDateTime.now());
//        logger.info(loginSeq + " sendMessage 호출");
//
////        String topic = KafkaConstants.KAFKA_TOPIC_PREFIX + message.getRoomId();
//        String topic = KafkaConstants.KAFKA_TOPIC_PREFIX;
//
//        try {
//            logger.info("Sending the message to kafka topic queue: " + topic);
//            kafkaTemplate.send(topic, message).get(); // 토픽은 채팅방 아이디로
//        } catch (InterruptedException | ExecutionException e) {
//            throw new ErrorResponse(HttpStatus.EXPECTATION_FAILED, "전송 실패");
//        }
//        return "";
//    }
//
//    @MessageMapping("/sendMessage")
//    public void broadcastGroupMessage(@Payload Message message) {
//        logger.info("Sending this message to all the subscribers");
////        String topic = KafkaConstants.KAFKA_TOPIC_PREFIX + message.getRoomId();
//        String topic = KafkaConstants.KAFKA_TOPIC_PREFIX;
//        messagingTemplate.convertAndSend(topic, message);
//    }
//
//    @Transactional
//    @KafkaListener(topics = KafkaConstants.KAFKA_TOPIC_PREFIX, groupId = KafkaConstants.GROUP_ID_PREFIX)
//    public void listen(Message message) {
//        logger.info("listen 호출");
//
//        String roomId = message.getRoomId();
//        logger.info("11111111111111111111111111");
//        ObjectId chatRoomId = new ObjectId("507f1f77bcf86cd799439011");
//        logger.info("22222222222222222222");
////        String topic = KafkaConstants.KAFKA_TOPIC_PREFIX + message.getRoomId();
//        String topic = KafkaConstants.KAFKA_TOPIC_PREFIX;
////        String groupId = KafkaConstants.GROUP_ID_PREFIX + message.getRoomId();
//        String groupId = KafkaConstants.GROUP_ID_PREFIX;
//
//        // DB에 새로운 메시지 저장
//        ChatMessage chatMessage = new ChatMessage();
//        logger.info("33333333333333333333333");
//        chatMessage.setSender(message.getSender());
//        chatMessage.setContent(message.getContent());
//        chatMessage.setTimestamp(message.getTimestamp());
////        addMessageToChatRoom(chatRoomId, chatMessage);
//
//        messagingTemplate.convertAndSend(topic, message);
//        logger.info("4444444444444444444");
//    }
//
//
//    @Transactional
//    public void addMessageToChatRoom(ObjectId chatRoomId, ChatMessage chatMessage) {
//
//        logger.info("addMessageToChatRoom 호출");
//
//        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
//                .orElse(chatRoomRepository.save(new ChatRoom()));
////                .orElseThrow(() -> new ErrorResponse(HttpStatus.BAD_REQUEST, "ChatRoom not found with id: " + chatRoomId));
//
//        // Add new message to the list
//        List<ChatMessage> messages = chatRoom.getMessages();
//        messages.add(chatMessage);
//        chatRoom.setMessages(messages);
//
//        // Update the lastMessage field
//        chatRoom.setLastMessage(chatMessage);
//
//        // Update the chat room in the database
//        chatRoomRepository.save(chatRoom);
//    }
//}
