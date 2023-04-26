package com.grouproom.xyz.domain.memory.service;

import com.grouproom.xyz.domain.memory.dto.request.MemoryListRequest;
import com.grouproom.xyz.domain.memory.dto.response.MemoryResponse;

import java.util.List;

public interface MemoryService {
    List<MemoryResponse> findMemory(Long loginUserSeq, MemoryListRequest memoryListRequest);
}