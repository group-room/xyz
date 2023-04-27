package com.grouproom.xyz.domain.memory.controller;

import com.grouproom.xyz.domain.memory.dto.request.AddMemoryRequest;
import com.grouproom.xyz.domain.memory.dto.request.MemoryListRequest;
import com.grouproom.xyz.domain.memory.dto.response.AddMemoryResponse;
import com.grouproom.xyz.domain.memory.dto.response.MemoryListResponse;
import com.grouproom.xyz.domain.memory.service.MemoryService;
import com.grouproom.xyz.global.exception.ErrorResponse;
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
        Boolean success = memoryService.removeMemory(userSeq, memorySeq);

        if (success == true) {
            return new BaseResponse("추억앨범 삭제 성공");
        }

        throw new ErrorResponse(HttpStatus.BAD_REQUEST, "추억앨범 삭제 실패");
    }

    @GetMapping("/like")
    public BaseResponse<?> likedMemoryList(@RequestParam(name = "memorySeq", required = false) Long memorySeq) {
        logger.info("likedMemoryList 호출");

        Long userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        MemoryListResponse memoryListResponse = memoryService.findLikedMemory(userSeq);
        return new BaseResponse(memoryListResponse);
    }

    @PostMapping("/like/{memorySeq}")
    public BaseResponse<?> addMemoryLike(@PathVariable("memorySeq") Long memorySeq) {
        logger.info("addMemoryLike 호출");

        Long userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        Boolean success = memoryService.addMemoryLike(userSeq, memorySeq);

        if (success == true) {
            return new BaseResponse("좋아요 등록 성공");
        }

        throw new ErrorResponse(HttpStatus.BAD_REQUEST, "좋아요 등록 실패");
    }

    @DeleteMapping("/like/{memorySeq}")
    public BaseResponse<?> removeMemoryLike(@PathVariable("memorySeq") Long memorySeq) {
        logger.info("removeMemoryLike 호출");

        Long userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        Boolean success = memoryService.removeMemoryLike(userSeq, memorySeq);

        if (success == true) {
            return new BaseResponse("좋아요 삭제 성공");
        }

        throw new ErrorResponse(HttpStatus.BAD_REQUEST, "좋아요 삭제 실패");
    }
}
