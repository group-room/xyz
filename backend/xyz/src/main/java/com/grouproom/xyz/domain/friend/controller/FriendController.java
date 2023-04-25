package com.grouproom.xyz.domain.friend.controller;

import com.grouproom.xyz.domain.friend.dto.request.FriendRequest;
import com.grouproom.xyz.domain.friend.service.FriendManageService;
import com.grouproom.xyz.domain.friend.service.FriendRegisterService;
import com.grouproom.xyz.domain.friend.service.UserBlockService;
import com.grouproom.xyz.global.model.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@RequiredArgsConstructor
@RestController
@RequestMapping("/friend")
public class FriendController {

    private final FriendManageService friendManageService;
    private final FriendRegisterService friendRegisterService;
    private final UserBlockService userBlockService;
    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.friend.controller.FriendController");

    @GetMapping("/all")
    public BaseResponse<?> friendList() {
        logger.info("frinedList 호출");
        Long loginSeq = 1L;
        return new BaseResponse<>(friendManageService.findFriend(loginSeq));
    }

    @DeleteMapping("/{userSeq}")
    public BaseResponse<?> modifyFriendDelete(@PathVariable("userSeq") Long userSeq) {
        logger.info("modifyFriendDelete 호출");
        Long loginSeq = 1L;
        try {
            return new BaseResponse<>(friendManageService.modifyFriendDelete(loginSeq, userSeq));
        } catch (Exception e) {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST, "실패", "");
        }
    }

    @GetMapping()
    public BaseResponse<?> findFriendByNickname(@RequestParam String nickname) {
        logger.info("findFriendByNickname 호출");
        Long loginSeq = 1L;
        return new BaseResponse<>(friendManageService.findFriendByNickname(loginSeq, nickname));
    }

    @GetMapping("/{identify}")
    public BaseResponse<?> findFriendByIdentify(@PathVariable("identify") String identify) {
        logger.info("findFriendByIdentify 호출");
        Long loginSeq = 1L;
        try {
            return new BaseResponse<>(friendManageService.findFriendByIdentify(loginSeq, identify));
        } catch (Exception e) {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST, "실패", "");
        }
    }

    @GetMapping("/user")
    public BaseResponse<?> findUserByNickname(@RequestParam String nickname) {
        logger.info("findUserByNickname 호출");
        Long loginSeq = 1L;
        return new BaseResponse<>(friendRegisterService.findUserByNickname(loginSeq, nickname));
    }

    @GetMapping("/user/{identify}")
    public BaseResponse<?> findUserByIdentify(@PathVariable("identify") String identify) {
        logger.info("findUserByIdentify 호출");
        Long loginSeq = 1L;
        try {
            return new BaseResponse<>(friendRegisterService.findUserByIdentify(loginSeq, identify));
        } catch (RuntimeException re) {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST, "실패", "");
        }
    }

    @PostMapping()
    public BaseResponse<?> saveFriendRequest(@RequestBody FriendRequest friendRequest) {
        logger.info("saveFriendRequest 호출");
        Long loginSeq = 1L;
        try {
            return new BaseResponse<>(friendRegisterService.saveFriendRequest(loginSeq, friendRequest.getUserSeq()));
        } catch (Exception e) {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST, "실패", "");
        }
    }
}
