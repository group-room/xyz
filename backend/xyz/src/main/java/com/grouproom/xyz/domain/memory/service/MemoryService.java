package com.grouproom.xyz.domain.memory.service;

import com.grouproom.xyz.domain.memory.dto.request.MemoryListRequest;
import com.grouproom.xyz.domain.memory.dto.response.MemoryListResponse;

public interface MemoryService {
    MemoryListResponse findMemory(Long loginUserSeq, MemoryListRequest memoryListRequest);
}