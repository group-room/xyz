package com.grouproom.xyz.domain.user.controller;

import com.grouproom.xyz.domain.user.service.UserService;
import com.grouproom.xyz.global.model.BaseResponse;
import com.grouproom.xyz.global.service.S3UploadService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
public class UserController {

    private final S3UploadService s3UploadService;
    private final UserService userService;

    @DeleteMapping("")
    public BaseResponse removeUser() {
        Long userSequence = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

        userService.removeUser(userSequence);

        return new BaseResponse("성공적으로 삭제되었습니다.");
    }

    @GetMapping("/modifier")
    public BaseResponse modifierList() {
        Long userSequence = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

        return new BaseResponse(userService.findModifierByUserSequence(userSequence));
    }

    @GetMapping("/profile")
    public BaseResponse profileDetails(@RequestParam(value = "userSeq",required = false) Long userSeq){
        Long fromSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        if(userSeq==null)
            return new BaseResponse(userService.findProfileByUserSeq(fromSeq));
        else
            return new BaseResponse(userService.findProfileByUserSeq(fromSeq,userSeq));
    }

    @PostMapping("/profile")
    public BaseResponse saveProfile(@RequestPart(required = false)String nickname,@RequestPart(required = false) MultipartFile profileImage,
                                @RequestPart(required = false)MultipartFile backgroundImage,@RequestPart(required = false)String introduce,
                                @RequestPart(required = false)Long modifierSequence){
        Long userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        String profileImagePath = null,backgroundImagePath = null;

        if(null!=profileImage && !profileImage.isEmpty())
            profileImagePath = s3UploadService.upload(profileImage, "user");
        if(null!=backgroundImage && !backgroundImage.isEmpty())
            backgroundImagePath = s3UploadService.upload(backgroundImage, "user");

        userService.modifyProfile(userSeq,nickname,profileImagePath,backgroundImagePath,introduce,modifierSequence);

        return new BaseResponse(null);
    }

    @PostMapping("/visitor")
    public BaseResponse saveVisitor(Long userSeq,String content){
        Long fromUserSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        userService.addVisitor(fromUserSeq,userSeq,content);
        return new BaseResponse(null);
    }

    @DeleteMapping("/visitor/{visitorSeq}")
    public BaseResponse removeVisitor(@PathVariable("visitorSeq") Long visitorSeq){
        Long userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        userService.removeVisitor(userSeq,visitorSeq);
        return new BaseResponse(null);
    }

    @GetMapping("/visitor")
    public BaseResponse visitorList(Long userSeq) {
        return new BaseResponse(userService.findVisitorByUserSequence(userSeq));
    }
}
