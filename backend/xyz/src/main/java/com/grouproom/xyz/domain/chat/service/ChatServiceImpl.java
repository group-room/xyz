package com.grouproom.xyz.domain.chat.service;

import com.grouproom.xyz.domain.chat.dto.Message;
import com.grouproom.xyz.global.config.kafka.KafkaConstants;
import com.grouproom.xyz.global.exception.ErrorResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.concurrent.ExecutionException;
import java.util.logging.Logger;

@RequiredArgsConstructor
@Service
public class ChatServiceImpl implements ChatService {

    private final KafkaTemplate<String, Message> kafkaTemplate;
    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.chat.service.ChatServiceImpl");

    @Override
    public String sendMessage(Long loginSeq, Message message) {
        message.setSender(loginSeq);
        message.setTimestamp(LocalDateTime.now().toString());
        logger.info(loginSeq + " sendMessage 호출");
        try {
            logger.info(message.getSender() + ": " + message.getContent());
            logger.info("Sending the message to kafka topic queue");
            kafkaTemplate.send(KafkaConstants.KAFKA_TOPIC, message).get();
        } catch (InterruptedException | ExecutionException e) {
            throw new ErrorResponse(HttpStatus.EXPECTATION_FAILED, "전송 실패");
        }
        return "";
    }

    @MessageMapping("/sendMessage")
    @SendTo("/topic/group")
    public Message broadcastGroupMessage(@Payload Message message) {
        logger.info("Sending this message to all the subscribers");
        return message;
    }
}
