package com.grouproom.chat.consumer;

import com.grouproom.chat.dto.KafkaMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import reactor.core.publisher.DirectProcessor;
import reactor.core.publisher.Flux;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * packageName    : com.example.WebSocketAndKafka.consumer
 * fileName       : KafkaConsumer
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
public class Consumer {

    private final Map<String, DirectProcessor<KafkaMessage>> processorMap = new ConcurrentHashMap<>();
    private final Map<String, Flux<KafkaMessage>> fluxMap = new ConcurrentHashMap<>();


    public Flux<KafkaMessage> getKafkaMessages(String room) {
        return fluxMap.computeIfAbsent(room, r -> {
            DirectProcessor<KafkaMessage> processor = DirectProcessor.create();
            processorMap.put(r, processor);
            return processor.share();
        });
    }

    @KafkaListener(topics = "xyz", groupId = "${kafka.group.id:${random.uuid}}", containerFactory = "listenerContainerFactory")
    public void updateQty(KafkaMessage kafkaMessage) throws Exception {
        log.info("CONSUME PAYLOAD : {}", kafkaMessage);

        // Send the Kafka message to all subscribers in a specific room
        String room = kafkaMessage.getRoom(); // Assuming KafkaMessage has a getRoom method
        DirectProcessor<KafkaMessage> processor = processorMap.get(room);
        if (processor != null) {
            processor.onNext(kafkaMessage);
        }
    }
}