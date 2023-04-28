package com.grouproom.xyz.domain.azt.controller;

import com.grouproom.xyz.domain.azt.dto.request.AztRequest;
import com.grouproom.xyz.domain.azt.service.AztService;
import com.grouproom.xyz.global.model.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@RequiredArgsConstructor
@RestController
@RequestMapping("/azt")
public class AztController {

    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.azt.controller.AztController");
    private final AztService aztService;

    @PostMapping
    public BaseResponse<?> addAzt(@RequestBody AztRequest aztRequest) {
        logger.info("addAzt 호출");
        Long loginSeq = 1L;
        try {
            return new BaseResponse<>(aztService.addAzt(loginSeq, aztRequest));
        } catch (Exception e) {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST, "실패", "");
        }
    }

    @PutMapping
    public BaseResponse<?> modifyAzt(@RequestBody AztRequest aztRequest) {
        logger.info("modifyAzt 호출");
        Long loginSeq = 1L;
        try {
            return new BaseResponse<>(aztService.modifyAzt(loginSeq, aztRequest));
        } catch (Exception e) {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST, "실패", "");
        }
    }

    @GetMapping("")
    public BaseResponse<?> friendList(@RequestParam Long aztSeq) {
        logger.info("friendList 호출");
        Long loginSeq = 1L;
        return new BaseResponse<>(aztService.findFriendForMembers(loginSeq, aztSeq));
    }

    @PostMapping("/member")
    public BaseResponse<?> addAztMember(@RequestBody AztRequest aztRequest) {
        logger.info("addAztMember 호출");
        Long loginSeq = 1L;
        try {
            return new BaseResponse<>(aztService.addAztMember(loginSeq, aztRequest));
        } catch (Exception e) {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST, "실패", "");
        }
    }

    @DeleteMapping("/member/{aztSeq}")
    public BaseResponse<?> modifyAztMemberToDelete(@PathVariable("aztSeq") Long aztSeq) {
        logger.info("modifyAztMemberToDelete 호출");
        Long loginSeq = 1L;
        try {
            return new BaseResponse<>(aztService.modifyAztMemberToDelete(loginSeq, aztSeq));
        } catch (Exception e) {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST, "실패", "");
        }
    }

}
