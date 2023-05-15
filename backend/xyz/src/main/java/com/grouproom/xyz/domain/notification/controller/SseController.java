package com.grouproom.xyz.domain.notification.controller;

import com.grouproom.xyz.domain.notification.service.SseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.logging.Logger;

@RestController
@RequestMapping("/connect")
@RequiredArgsConstructor
public class SseController {

    private final SseService sseService;
    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.notification.controller.SseController");

    @CrossOrigin
    @GetMapping(consumes = MediaType.ALL_VALUE)
    public SseEmitter connect() {
        logger.info("connect 호출");

        Long userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

        SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
        try {
            sseEmitter.send(SseEmitter.event().name("connect"));
            logger.info("connect success");
        } catch (IOException e) {
            logger.info(e.getMessage());
        }

        sseService.addSseEmitter(userSeq, sseEmitter);

        sseEmitter.onCompletion(() -> sseService.removeSseEmitter(userSeq));
        sseEmitter.onTimeout(() -> sseService.removeSseEmitter(userSeq));
        sseEmitter.onError(e -> sseService.removeSseEmitter(userSeq));

        return sseEmitter;
    }
}
