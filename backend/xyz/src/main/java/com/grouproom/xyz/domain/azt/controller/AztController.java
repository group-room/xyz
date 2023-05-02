package com.grouproom.xyz.domain.azt.controller;

import com.grouproom.xyz.domain.azt.dto.request.AddAztMemberRequest;
import com.grouproom.xyz.domain.azt.dto.request.AddAztRequest;
import com.grouproom.xyz.domain.azt.dto.request.ModifyAztRequest;
import com.grouproom.xyz.domain.azt.service.AztService;
import com.grouproom.xyz.global.model.BaseResponse;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.logging.Logger;

@RequiredArgsConstructor
@RestController
@RequestMapping("/azt")
public class AztController {

    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.azt.controller.AztController");
    private final AztService aztService;

    @ApiOperation(value = "아지트 목록 조회", notes = "로그인한 사용자가 소속된 아지트 목록을 반환한다.")
    @GetMapping ("/all")
    public BaseResponse<?> aztList() {
        logger.info("aztList 호출");
        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return new BaseResponse<>(aztService.findAztList(loginSeq));
    }

    @ApiOperation(value = "아지트 상세 조회", notes = "선택한 아지트의 상세 정보를 반환한다.")
    @GetMapping ("/{aztSeq}")
    public BaseResponse<?> aztDetails(@PathVariable("aztSeq") Long aztSeq) {
        logger.info("aztDetails 호출");
        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return new BaseResponse<>(aztService.findAzt(loginSeq, aztSeq));
    }

    @ApiOperation(value = "아지트 생성", notes = "아지트 생성 후 해당 아지트의 상세 정보를 반환한다. (name required, aztSeq not used)")
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public BaseResponse<?> addAzt(@RequestPart AddAztRequest addAztRequest, @RequestPart(required = false) MultipartFile image) {
        logger.info("addAzt 호출");
        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return new BaseResponse<>(aztService.addAzt(loginSeq, addAztRequest, image));
    }

    @ApiOperation(value = "아지트 수정", notes = "아지트 이름/대표사진을 수정 후 해당 아지트의 상세 정보를 반환한다. (aztSeq required, members not used)")
    @PutMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public BaseResponse<?> modifyAzt(@RequestPart ModifyAztRequest modifyAztRequest, @RequestPart(required = false) MultipartFile image) {
        logger.info("modifyAzt 호출");
        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return new BaseResponse<>(aztService.modifyAzt(loginSeq, modifyAztRequest, image));
    }

    @ApiOperation(value = "초대할 수 있는 친구 목록 조회", notes = "선택한 아지트에 초대할 수 있는 친구 목록을 반환한다.")
    @GetMapping("/friend/all")
    public BaseResponse<?> friendList(@RequestParam Long aztSeq) {
        logger.info("friendList 호출");
        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return new BaseResponse<>(aztService.findFriendForMembers(loginSeq, aztSeq));
    }

    @ApiOperation(value = "멤버 초대", notes = "선택한 아지트에 선택한 멤버들을 추가한 후 해당 아지트 상세 정보를 반환한다. (aztseq/members required, name/image not used)")
    @PostMapping("/member")
    public BaseResponse<?> addAztMember(@RequestBody AddAztMemberRequest addAztMemberRequest) {
        logger.info("addAztMember 호출");
        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return new BaseResponse<>(aztService.addAztMember(loginSeq, addAztMemberRequest));
    }

    @ApiOperation(value = "아지트 탈퇴", notes = "로그인한 사용자를 선택한 아지트에서 삭제 후 아지트 목록을 반환한다.")
    @DeleteMapping("/member/{aztSeq}")
    public BaseResponse<?> modifyAztMemberToDelete(@PathVariable("aztSeq") Long aztSeq) {
        logger.info("modifyAztMemberToDelete 호출");
        Long loginSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return new BaseResponse<>(aztService.modifyAztMemberToDelete(loginSeq, aztSeq));
    }

}
