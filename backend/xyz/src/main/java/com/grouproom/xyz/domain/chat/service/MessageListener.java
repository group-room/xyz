package com.grouproom.xyz.domain.chat.service;

import com.grouproom.xyz.domain.chat.dto.Message;
import com.grouproom.xyz.global.config.kafka.KafkaConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@RequiredArgsConstructor
@Component
public class MessageListener {

    private final SimpMessagingTemplate template;
    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.chat.service.MessageListener");


    @KafkaListener(
            topics = KafkaConstants.KAFKA_TOPIC,
            groupId = KafkaConstants.GROUP_ID
    )
    public void listen(Message message) {

        logger.info("listen 호출");
        template.convertAndSend("/topic/group", message);
    }
}
