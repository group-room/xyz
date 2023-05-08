package com.grouproom.xyz.domain.notification.service;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;

public interface SseService {

    Map<Long, SseEmitter> getSseEmitters();

    SseEmitter getSseEmitter(Long userSeq);

    void addSseEmitter(Long userSeq, SseEmitter sseEmitter);

    boolean containsSseEmitter(Long userSeq);

    void removeSseEmitter(Long userSeq);
}
