package com.grouproom.xyz.domain.user.controller;

import com.grouproom.xyz.domain.user.service.UserService;
import com.grouproom.xyz.global.model.BaseResponse;
import com.grouproom.xyz.global.service.S3UploadService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

/**
 * packageName    : com.grouproom.xyz.domain.user.controller
 * fileName       : UserController
 * author         : SSAFY
 * date           : 2023-04-21
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-04-21        SSAFY       최초 생성
 */

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final S3UploadService s3UploadService;
    private final UserService userService;

//    @PostMapping("/profile")
//    String test( MultipartFile files){
//        if(null==files || files.isEmpty())
//            log.error("file null");
//
//        return s3UploadService.upload(files, "record");
//    }

    @DeleteMapping("")
    BaseResponse removeUser() {
        Long userSequence = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

        userService.removeUser(userSequence);

        return new BaseResponse("성공적으로 삭제되었습니다.");
    }

    @GetMapping("/modifier")
    BaseResponse modifierList() {
        Long userSequence = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

        return new BaseResponse(userService.findModifierByUserSequence(userSequence));
    }

    @GetMapping("/profile")
    BaseResponse profileDetails(@RequestParam(value = "userSeq",required = false) Long userSeq){
        Long fromSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        if(userSeq==null)
            return new BaseResponse(userService.findProfileByUserSeq(fromSeq));
        else
            return new BaseResponse(userService.findProfileByUserSeq(fromSeq,userSeq));
    }

}
