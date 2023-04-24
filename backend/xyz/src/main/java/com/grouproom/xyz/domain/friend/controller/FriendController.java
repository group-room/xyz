package com.grouproom.xyz.domain.friend.controller;

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

    @GetMapping()
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

}
