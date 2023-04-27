package com.grouproom.xyz.domain.memory.service;

import com.grouproom.xyz.domain.memory.dto.request.AddMemoryRequest;
import com.grouproom.xyz.domain.memory.dto.request.MemoryListRequest;
import com.grouproom.xyz.domain.memory.dto.response.AddMemoryResponse;
import com.grouproom.xyz.domain.memory.dto.response.MemoryListResponse;
import com.grouproom.xyz.domain.memory.entity.Memory;
import com.grouproom.xyz.global.model.FileType;

import java.util.List;

public interface MemoryService {

    void saveMemoryFiles(Memory memory, FileType fileType, List<String> filePaths);

    MemoryListResponse findMemory(Long userSeq, MemoryListRequest memoryListRequest);

    AddMemoryResponse addMemory(Long userSeq, AddMemoryRequest addMemoryRequest);

    Boolean removeMemory(Long userSeq, Long memorySeq);

    Boolean addMemoryLike(Long userSeq, Long memorySeq);

    Boolean removeMemoryLike(Long userSeq, Long memorySeq);
}