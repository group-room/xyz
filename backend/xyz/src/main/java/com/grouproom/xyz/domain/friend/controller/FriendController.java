package com.grouproom.xyz.domain.friend.controller;

import com.grouproom.xyz.domain.friend.dto.request.FriendRequest;
import com.grouproom.xyz.domain.friend.service.FriendManageService;
import com.grouproom.xyz.domain.friend.service.FriendRegisterService;
import com.grouproom.xyz.domain.friend.service.UserBlockService;
import com.grouproom.xyz.global.model.BaseResponse;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @ApiOperation(value = "친구 목록 조회", notes = "로그인한 유저의 친구 목록을 반환한다.")
    @GetMapping("/all")
    public BaseResponse<?> friendList() {
        logger.info("frinedList 호출");
        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return new BaseResponse<>(friendManageService.findFriend(loginSeq));
    }

    @ApiOperation(value = "친구 삭제", notes = "선택한 유저(유저시퀀스)를 친구에서 삭제 처리한다.")
    @DeleteMapping("/{userSeq}")
    public BaseResponse<?> modifyFriendToDeleted(@PathVariable("userSeq") Long userSeq) {
        logger.info("modifyFriendDelete 호출");
        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return new BaseResponse<>(friendManageService.modifyFriendToDeleted(loginSeq, userSeq));
    }

    @ApiOperation(value = "닉네임으로 친구 찾기", notes = "친구 중 닉네임에 해당하는 유저 목록을 반환한다.")
    @GetMapping()
    public BaseResponse<?> findFriendByNickname(@RequestParam String nickname) {
        logger.info("findFriendByNickname 호출");
        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return new BaseResponse<>(friendManageService.findFriendByNickname(loginSeq, nickname));
    }

    @ApiOperation(value = "고유 코드로 친구 찾기", notes = "친구 중 고유 코드에 해당하는 유저를 반환한다.")
    @GetMapping("/{identify}")
    public BaseResponse<?> findFriendByIdentify(@PathVariable("identify") String identify) {
        logger.info("findFriendByIdentify 호출");
        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return new BaseResponse<>(friendManageService.findFriendByIdentify(loginSeq, identify));
    }

    @ApiOperation(value = "닉네임으로 유저 찾기", notes = "닉네임에 해당하는 유저 목록을 반환한다.")
    @GetMapping("/user")
    public BaseResponse<?> findUserByNickname(@RequestParam String nickname) {
        logger.info("findUserByNickname 호출");
        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return new BaseResponse<>(friendRegisterService.findUserByNickname(loginSeq, nickname));
    }

    @ApiOperation(value = "고유 코드로 유저 찾기", notes = "고유 코드에 해당하는 유저를 반환한다.")
    @GetMapping("/user/{identify}")
    public BaseResponse<?> findUserByIdentify(@PathVariable("identify") String identify) {
        logger.info("findUserByIdentify 호출");
        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return new BaseResponse<>(friendRegisterService.findUserByIdentify(loginSeq, identify));
    }

    @ApiOperation(value = "친구 요청", notes = "로그인한 유저로부터 해당하는 유저에게 친구 요청을 보낸다.")
    @PostMapping()
    public BaseResponse<?> saveFriend(@RequestBody FriendRequest friendRequest) {
        logger.info("saveFriendRequest 호출");
        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return new BaseResponse<>(friendRegisterService.saveFriend(loginSeq, friendRequest.getUserSeq()));
    }

    @ApiOperation(value = "친구 요청 취소", notes = "수락하기 전에 한해 로그인한 유저의 해당 유저에 대한 친구 요청을 취소한다.")
    @PutMapping("/cancel")
    public BaseResponse<?> modifyFriendToCancel(@RequestBody FriendRequest friendRequest) {
        logger.info("cancelFriendRequest 호출");
        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return new BaseResponse<>(friendRegisterService.modifyFriendToCancel(loginSeq, friendRequest.getUserSeq()));
    }

    @ApiOperation(value = "친구 요청 수락", notes = "취소하기 전에 한해 로그인한 유저에게 들어온 해당 유저의 친구 요청을 수락한다.")
    @PutMapping("/accept")
    public BaseResponse<?> modifyFriendToAccept(@RequestBody FriendRequest friendRequest) {
        logger.info("modifyFriendToAccept 호출");
        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return new BaseResponse<>(friendRegisterService.modifyFriendToAccept(loginSeq, friendRequest.getUserSeq()));
    }

    @ApiOperation(value = "사용자 차단", notes = "해당하는 유저를 차단한다. 친구일 경우 친구에서도 삭제한다.")
    @PostMapping("/block")
    public BaseResponse<?> saveUserBlock(@RequestBody FriendRequest friendRequest) {
        logger.info("saveUserBlock 호출");
        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return new BaseResponse<>(userBlockService.saveUserBlock(loginSeq, friendRequest.getUserSeq()));
    }

    @ApiOperation(value = "사용자 차단 해제", notes = "해당하는 유저의 차단을 해제한다.")
    @DeleteMapping("/block/{userSeq}")
    public BaseResponse<?> modifyUserBlock(@PathVariable("userSeq") Long userSeq) {
        logger.info("modifyUserBlock 호출");
        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return new BaseResponse<>(userBlockService.modifySaveBlock(loginSeq, userSeq));
    }

    @ApiOperation(value = "차단 목록 조회", notes = "차단한 사용자 목록을 조회한다.")
    @GetMapping("/block")
    public BaseResponse userBlockList() {
        logger.info("userBlockList 호출");
        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return new BaseResponse(userBlockService.findUserBlock(loginSeq));
    }
}
