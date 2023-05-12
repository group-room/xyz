package com.grouproom.chat.producer;

import com.grouproom.chat.dto.KafkaMessage;
import com.grouproom.chat.entity.Chat;
import com.grouproom.chat.repository.MongoDBRepository;
import com.grouproom.chat.service.SequenceGeneratorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * packageName    : com.example.WebSocketAndKafka.producer
 * fileName       : KafkaProducer
 * author         : SSAFY
 * date           : 2023-05-10
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-05-10        SSAFY       최초 생성
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class Producer {

    private final KafkaTemplate<String, KafkaMessage> kafkaTemplate;
    private final MongoDBRepository mongoDBRepository;
    private final SequenceGeneratorService sequenceGeneratorService;

    public void orderSend(String topic, KafkaMessage message) {
        LocalDateTime localDateTimeNow = LocalDateTime.now();
        String time = localDateTimeNow.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        message.setTime(time);
        kafkaTemplate.send(topic, message);
        log.info("Kafka Producer send data from the order service = {}", message);
        mongoDBRepository.insert(
                Chat.builder()
                        .id(sequenceGeneratorService.generateSequence(Chat.SEQUENCE_NAME))
                        .text(message.getText())
                        .name(message.getName())
                        .room(message.getRoom())
                        .time(time)
                        .build());
    }
}
