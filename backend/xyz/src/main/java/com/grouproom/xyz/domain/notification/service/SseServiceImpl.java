package com.grouproom.xyz.domain.notification.service;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SseServiceImpl implements SseService {

    private final Map<Long, SseEmitter> sseEmitters = new ConcurrentHashMap<>();

    @Override
    public Map<Long, SseEmitter> getSseEmitters() {
        return sseEmitters;
    }

    @Override
    public SseEmitter getSseEmitter(Long userSeq) {
        return sseEmitters.get(userSeq);
    }

    @Override
    public void addSseEmitter(Long userSeq, SseEmitter sseEmitter) {
        sseEmitters.put(userSeq, sseEmitter);
    }

    @Override
    public boolean containsSseEmitter(Long userSeq) {
        return sseEmitters.containsKey(userSeq);
    }

    @Override
    public void removeSseEmitter(Long userSeq) {
        sseEmitters.remove(userSeq);
    }
}
