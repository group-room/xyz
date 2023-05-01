package com.grouproom.xyz.domain.memory.controller;

import com.grouproom.xyz.domain.memory.dto.request.AddMemoryRequest;
import com.grouproom.xyz.domain.memory.dto.request.MemoryListRequest;
import com.grouproom.xyz.domain.memory.dto.response.AddMemoryResponse;
import com.grouproom.xyz.domain.memory.dto.response.MemoryDetailResponse;
import com.grouproom.xyz.domain.memory.dto.response.MemoryListResponse;
import com.grouproom.xyz.domain.memory.service.MemoryService;
import com.grouproom.xyz.global.exception.ErrorResponse;
import com.grouproom.xyz.global.model.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
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

    @GetMapping("/{memorySeq}")
    public BaseResponse<?> memoryDetail(@PathVariable("memorySeq") Long memorySeq) {
        logger.info("memoryDetail 호출");

        MemoryDetailResponse memoryDetail = memoryService.findMemoryDetail(memorySeq);

        return new BaseResponse(memoryDetail);
    }

    @PostMapping()
    public BaseResponse<?> addMemory(@RequestPart AddMemoryRequest addMemoryRequest, @RequestPart(required = false) List<MultipartFile> images, @RequestPart(required = false) List<MultipartFile> audios) throws Exception {
        logger.info("addMemory 호출");

        Long userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        AddMemoryResponse addMemoryResponse = memoryService.addMemory(userSeq, addMemoryRequest, images, audios);

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

    @GetMapping("/mymemories")
    public BaseResponse<?> myMemoryList(@RequestParam(name = "memorySeq", required = false) Long memorySeq) {
        logger.info("myMemoryList 호출");

        Long userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        MemoryListResponse memoryListResponse = memoryService.findMyMemory(userSeq);

        return new BaseResponse(memoryListResponse);
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
        memoryService.addMemoryLike(userSeq, memorySeq);

        return new BaseResponse("좋아요 등록 성공");
    }

    @DeleteMapping("/like/{memorySeq}")
    public BaseResponse<?> removeMemoryLike(@PathVariable("memorySeq") Long memorySeq) {
        logger.info("removeMemoryLike 호출");

        Long userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        memoryService.removeMemoryLike(userSeq, memorySeq);

        return new BaseResponse("좋아요 삭제 성공");
    }

    @PostMapping("/comment/{memorySeq}")
    public BaseResponse<?> addMemoryComment(@PathVariable("memorySeq") Long memorySeq, @RequestBody String content) {
        logger.info("addMemoryComment 호출");

        Long userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        memoryService.addMemoryComment(userSeq, memorySeq, content);

        return new BaseResponse("댓글 작성 성공");
    }
}
