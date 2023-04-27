package com.grouproom.xyz.domain.memory.controller;

import com.grouproom.xyz.domain.memory.dto.request.AddMemoryRequest;
import com.grouproom.xyz.domain.memory.dto.request.MemoryListRequest;
import com.grouproom.xyz.domain.memory.dto.response.AddMemoryResponse;
import com.grouproom.xyz.domain.memory.dto.response.MemoryListResponse;
import com.grouproom.xyz.domain.memory.service.MemoryService;
import com.grouproom.xyz.global.model.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
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

        Long userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        MemoryListResponse memoryListResponse = memoryService.findMemory(userSeq, memoryListRequest);
        return new BaseResponse(memoryListResponse);
    }

    @PostMapping()
    public BaseResponse<?> addMemory(@ModelAttribute AddMemoryRequest addMemoryRequest) {
        logger.info("addMemory 호출");

        Long userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        AddMemoryResponse addMemoryResponse = memoryService.addMemory(userSeq, addMemoryRequest);
        return new BaseResponse(addMemoryResponse);
    }

    @DeleteMapping("/{memorySeq}")
    public BaseResponse<?> removeMemory(@PathVariable("memorySeq") Long memorySeq) {
        logger.info("removeMemory 호출");

        Long userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        Boolean removeSuccess = memoryService.removeMemory(userSeq, memorySeq);

        if (removeSuccess == true) {
            return new BaseResponse("성공적으로 삭제되었습니다.");
        }

        return new BaseResponse(HttpStatus.BAD_REQUEST, "실패", "삭제 실패");
    }

    @PostMapping("/like/{memorySeq}")
    public BaseResponse<?> addLike(@PathVariable("memorySeq") Long memorySeq) {
        logger.info("addLike 호출");

        Long userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        Boolean success = memoryService.addMemoryLike(userSeq, memorySeq);

        if (success == true) {
            return new BaseResponse("좋아요 목록에 추가되었습니다.");
        }

        return new BaseResponse(HttpStatus.BAD_REQUEST, "실패", "이미 좋아요한 memory입니다.");
    }
}
