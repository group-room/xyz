package com.grouproom.xyz.domain.myroom.controller;

import com.grouproom.xyz.domain.myroom.service.MyRoomService;
import com.grouproom.xyz.domain.myroom.dto.request.StickerRequest;
import com.grouproom.xyz.global.model.BaseResponse;
import com.grouproom.xyz.global.service.S3UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

/**
 * packageName    : com.grouproom.xyz.domain.myroom.controller
 * fileName       : MyroomController
 * author         : SSAFY
 * date           : 2023-04-28
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-04-28        SSAFY       최초 생성
 */
@RestController
@RequestMapping("/my-room")
@RequiredArgsConstructor
public class MyRoomController {

    private final S3UploadService s3UploadService;
    private final MyRoomService myRoomService;

    @GetMapping("/update-asset")
    BaseResponse updateAsset() {
        List<HashMap> assets = s3UploadService.listBucketObjects();
        myRoomService.removeAllStickers();
        myRoomService.addStickersFromS3Asset(assets);
        return new BaseResponse(null);
    }


    @GetMapping("/sticker")
    BaseResponse stickerList() {
        return new BaseResponse(myRoomService.findSticker());
    }

    @PostMapping("/sticker")
    BaseResponse saveSticker(StickerRequest stickerRequest) {
        Long userSequence = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        myRoomService.addSticker(userSequence,stickerRequest);

        return new BaseResponse(null);
    }

    @DeleteMapping("/sticker/{userStickerSeq}")
    BaseResponse removeMyRoomByStickerSeq(@PathVariable("userStickerSeq") Long userStickerSeq) {
        Long userSequence = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        myRoomService.removeMyRoomByStickerSeq(userSequence,userStickerSeq);
        return new BaseResponse(null);
    }

    @DeleteMapping("/sticker")
    BaseResponse removeMyRoom() {
        Long userSequence = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        myRoomService.removeMyRoom(userSequence);
        return new BaseResponse(null);
    }

    @GetMapping("")
    BaseResponse myRoomList(@RequestParam(name = "userSeq",required = false) Long userSeq)
    {
        if(null == userSeq) {
            Long userSequence = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
            return new BaseResponse(myRoomService.findMyRoomByUserSeq(userSequence));
        }
        else{
            return new BaseResponse(myRoomService.findMyRoomByUserSeq(userSeq));
        }
    }

}
