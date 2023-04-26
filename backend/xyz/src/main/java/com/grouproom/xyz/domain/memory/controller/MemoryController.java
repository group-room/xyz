package com.grouproom.xyz.domain.memory.controller;

import com.grouproom.xyz.domain.memory.dto.request.MemoryListRequest;
import com.grouproom.xyz.domain.memory.dto.response.MemoryListResponse;
import com.grouproom.xyz.domain.memory.service.MemoryService;
import com.grouproom.xyz.global.model.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.logging.Logger;

@RestController
@RequestMapping("/memory")
@RequiredArgsConstructor
public class MemoryController {

    private final MemoryService memoryService;
    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.memory.controller.MemoryController");

    @GetMapping()
    public BaseResponse<?> memoryList(@ModelAttribute MemoryListRequest memoryListRequest) {
        logger.info("memoryList 호출");
        Long loginSeq = 1L;
        MemoryListResponse memoryListResponse = memoryService.findMemory(loginSeq, memoryListRequest);
        return new BaseResponse(memoryListResponse);
    }
}
