package com.grouproom.xyz.domain.memory.controller;

import com.grouproom.xyz.domain.memory.dto.request.AddMemoryRequest;
import com.grouproom.xyz.domain.memory.dto.request.MemoryListRequest;
import com.grouproom.xyz.domain.memory.dto.response.AddMemoryResponse;
import com.grouproom.xyz.domain.memory.dto.response.MemoryListResponse;
import com.grouproom.xyz.domain.memory.service.MemoryService;
import com.grouproom.xyz.global.model.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping()
    public BaseResponse<?> addMemory(@ModelAttribute AddMemoryRequest addMemoryRequest) {
        logger.info("addMemory 호출");

        Long loginSeq = 1L;
        AddMemoryResponse addMemoryResponse = memoryService.addMemory(loginSeq, addMemoryRequest);
        return new BaseResponse(addMemoryResponse);
    }

    @DeleteMapping("/{memorySeq}")
    public BaseResponse<?> removeMemory(@PathVariable("memorySeq") Long memorySeq) {
        logger.info("removeMemory 호출");

        Long loginSeq = 1L;
        memoryService.removeMemory(loginSeq, memorySeq);

        return new BaseResponse("성공적으로 삭제되었습니다.");
    }
}
