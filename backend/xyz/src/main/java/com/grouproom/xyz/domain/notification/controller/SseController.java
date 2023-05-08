package com.grouproom.xyz.domain.notification.controller;

import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Logger;

@RestController
@RequestMapping("/connect")
public class SseController {

    public static final Map<Long, SseEmitter> sseEmitters = new ConcurrentHashMap<>();
    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.notification.controller.SseController");

    @CrossOrigin
    @GetMapping(consumes = MediaType.ALL_VALUE)
    public SseEmitter connect() {
        logger.info("connect 호출");

        Long userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

        SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
        try {
            sseEmitter.send(SseEmitter.event().name("connect"));
        } catch (IOException e) {
            logger.info(e.getMessage());
        }

        sseEmitters.put(userSeq, sseEmitter);

        sseEmitter.onCompletion(() -> sseEmitters.remove(userSeq));
        sseEmitter.onTimeout(() -> sseEmitters.remove(userSeq));
        sseEmitter.onError(e -> sseEmitters.remove(userSeq));

        return sseEmitter;
    }
}
