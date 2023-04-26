package com.grouproom.xyz.domain.memory.service;

import com.grouproom.xyz.domain.memory.dto.request.AddMemoryRequest;
import com.grouproom.xyz.domain.memory.dto.request.MemoryListRequest;
import com.grouproom.xyz.domain.memory.dto.response.AddMemoryResponse;
import com.grouproom.xyz.domain.memory.dto.response.MemoryListResponse;

public interface MemoryService {
    MemoryListResponse findMemory(Long loginUserSeq, MemoryListRequest memoryListRequest);

    AddMemoryResponse addMemory(Long userSeq, AddMemoryRequest addMemoryRequest);
}