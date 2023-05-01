package com.grouproom.xyz.domain.friend.controller;

import com.grouproom.xyz.domain.friend.dto.request.FriendRequest;
import com.grouproom.xyz.domain.friend.service.FriendManageService;
import com.grouproom.xyz.domain.friend.service.FriendRegisterService;
import com.grouproom.xyz.domain.friend.service.UserBlockService;
import com.grouproom.xyz.global.model.BaseResponse;
import lombok.RequiredArgsConstructor;
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
    public BaseResponse<?> modifyFriendToDeleted(@PathVariable("userSeq") Long userSeq) {
        logger.info("modifyFriendDelete 호출");
        Long loginSeq = 1L;
        return new BaseResponse<>(friendManageService.modifyFriendToDeleted(loginSeq, userSeq));
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
        return new BaseResponse<>(friendManageService.findFriendByIdentify(loginSeq, identify));
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
        return new BaseResponse<>(friendRegisterService.findUserByIdentify(loginSeq, identify));
    }

    @PostMapping()
    public BaseResponse<?> saveFriend(@RequestBody FriendRequest friendRequest) {
        logger.info("saveFriendRequest 호출");
        Long loginSeq = 1L;
        return new BaseResponse<>(friendRegisterService.saveFriend(loginSeq, friendRequest.getUserSeq()));
    }

    @PutMapping("/cancel")
    public BaseResponse<?> modifyFriendToCancel(@RequestBody FriendRequest friendRequest) {
        logger.info("cancelFriendRequest 호출");
        Long loginSeq = 1L;
        return new BaseResponse<>(friendRegisterService.modifyFriendToCancel(loginSeq, friendRequest.getUserSeq()));
    }

    @PutMapping("/accept")
    public BaseResponse<?> modifyFriendToAccept(@RequestBody FriendRequest friendRequest) {
        logger.info("modifyFriendToAccept 호출");
        Long loginSeq = 1L;
        return new BaseResponse<>(friendRegisterService.modifyFriendToAccept(loginSeq, friendRequest.getUserSeq()));
    }

    @PostMapping("/block")
    public BaseResponse<?> saveUserBlock(@RequestBody FriendRequest friendRequest) {
        logger.info("saveUserBlock 호출");
        Long loginSeq = 1L;
        return new BaseResponse<>(userBlockService.saveUserBlock(loginSeq, friendRequest.getUserSeq()));
    }

    @DeleteMapping("/block/{userSeq}")
    public BaseResponse<?> modifyUserBlock(@PathVariable("userSeq") Long userSeq) {
        logger.info("modifyUserBlock 호출");
        Long loginSeq = 1L;
        return new BaseResponse<>(userBlockService.modifySaveBlock(loginSeq, userSeq));
    }
}
