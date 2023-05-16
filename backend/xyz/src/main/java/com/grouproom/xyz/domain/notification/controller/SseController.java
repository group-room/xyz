package com.grouproom.xyz.domain.notification.controller;

import com.grouproom.xyz.domain.notification.service.SseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.concurrent.Executors;
import java.util.logging.Logger;

@RestController
@RequestMapping("/connect")
@RequiredArgsConstructor
public class SseController {

    private final SseService sseService;
//    Executors.newSingleThreadExecutor()

    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.notification.controller.SseController");

    @GetMapping(consumes = MediaType.ALL_VALUE, produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connect() {
        logger.info("connect 호출");
        Long userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        SseEmitter emitter = new SseEmitter();
        sseService.addSseEmitter(userSeq, emitter);
        try {
            emitter.send(SseEmitter.event()
                    .name("connect")
                    .data("connected!\n\n"));
            logger.info("sse send success");
        } catch (IOException e) {
            logger.info("sse send fail");
            sseService.removeSseEmitter(userSeq);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        HttpHeaders headers = new HttpHeaders();
        headers.set("Connection", "keep-alive");
        headers.add("Cache-Control", "no-store");
        headers.add("Content-Type", "text/event-stream");
        headers.add("Access-Control-Allow-Origin", "http://localhost:3000");
        emitter.onCompletion(() -> sseService.removeSseEmitter(userSeq));
        emitter.onTimeout(() -> sseService.removeSseEmitter(userSeq));
        emitter.onError(e -> sseService.removeSseEmitter(userSeq));
        return ResponseEntity.ok().headers(headers).body(emitter);
    }

//    @CrossOrigin
//    @GetMapping(consumes = MediaType.ALL_VALUE, produces = MediaType.TEXT_EVENT_STREAM_VALUE)
//    public SseEmitter connect() {
//        logger.info("connect 호출");
//
//        Long userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
//
//        SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
//        try {
//            sseEmitter.send(SseEmitter.event().name("connect").data("connected\n\n"));
//            logger.info("connect success");
//        } catch (IOException e) {
//            logger.info(e.getMessage());
//        }
//
//        sseService.addSseEmitter(userSeq, sseEmitter);
//
//        sseEmitter.onCompletion(() -> sseService.removeSseEmitter(userSeq));
//        sseEmitter.onTimeout(() -> sseService.removeSseEmitter(userSeq));
//        sseEmitter.onError(e -> sseService.removeSseEmitter(userSeq));
//
//        return sseEmitter;
//    }
}
