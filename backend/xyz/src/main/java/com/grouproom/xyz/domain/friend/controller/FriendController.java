package com.grouproom.xyz.domain.friend.controller;

import com.grouproom.xyz.domain.friend.service.FriendManageService;
import com.grouproom.xyz.domain.friend.service.FriendRegisterService;
import com.grouproom.xyz.domain.friend.service.UserBlockService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/friend")
public class FriendController {

    private final FriendManageService friendManageService;
    private final FriendRegisterService friendRegisterService;
    private final UserBlockService userBlockService;

    @GetMapping("/all")
    public ResponseEntity<?> friendList() throws Exception {
        log.info("컨트롤러 : friendList 호출!!");
        Long userSeq = 1L;
        return new ResponseEntity<>(friendManageService.findFriend(userSeq), HttpStatus.OK);
    }


}
