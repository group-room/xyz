package com.grouproom.chat.controller;

import com.grouproom.chat.consumer.Consumer;
import com.grouproom.chat.dto.ChatRequest;
import com.grouproom.chat.dto.KafkaMessage;
import com.grouproom.chat.entity.Chat;
import com.grouproom.chat.producer.Producer;
import com.grouproom.chat.service.MongoDBService;
import com.grouproom.chat.service.S3UploadService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;

import java.util.List;

/**
 * packageName    : com.example.WebSocketAndKafka.controller
 * fileName       : ChatRestContoller
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
@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
@Slf4j
public class ChatRestController {
    private final MongoDBService mongoDBService;
    private final Producer producer;
    private final Consumer consumer;
    private final S3UploadService s3UploadService;

    @GetMapping("/history")
    List<Chat> getHistoryChat(@RequestParam(name = "room") String room, @RequestParam(name = "id", required = false) Long id) {
        log.error("getHistoryChat {} {}", room, id);
        if (null == id)
            return mongoDBService.getHistory(room);
        else
            return mongoDBService.getHistory(room, id);
    }

    @PostMapping("/message")
    String transferChar(@RequestBody KafkaMessage kafkaMessage) {
        producer.orderSend("xyz", kafkaMessage);
        return "SUCCESS";
    }

    @GetMapping("/recent-chat")
    List<Chat> transferChar(@RequestParam String name) {
        return mongoDBService.getLatestChat(name);
    }

    @GetMapping(value = "/stream-sse", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<KafkaMessage> stream(@RequestParam String room) {

        return consumer.getKafkaMessages(room);
    }

    @PostMapping(value = "/file", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE,MediaType.APPLICATION_JSON_VALUE})
    String transferFile(@RequestPart MultipartFile chatFile, @RequestPart ChatRequest chatRequest) {
        String chatImage = s3UploadService.upload(chatFile, "chat");
        KafkaMessage kafkaMessage = KafkaMessage.builder()
                .type(chatRequest.getType())
                .text(chatImage)
                .room(chatRequest.getRoom())
                .name(chatRequest.getName())
                .build();

        producer.orderfile("xyz", kafkaMessage);

        return "SUCCESS";
    }
}
