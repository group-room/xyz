package com.grouproom.xyz.domain.myroom.controller;

import com.grouproom.xyz.domain.myroom.service.MyRoomService;
import com.grouproom.xyz.domain.myroom.dto.request.StickerRequest;
import com.grouproom.xyz.global.model.BaseResponse;
import com.grouproom.xyz.global.service.S3UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public BaseResponse updateAsset() {
        List<HashMap> assets = s3UploadService.listBucketObjects();
        myRoomService.removeAllStickers();
        myRoomService.addStickersFromS3Asset(assets);
        return new BaseResponse(null);
    }


    @GetMapping("/sticker")
    public BaseResponse stickerList() {
        return new BaseResponse(myRoomService.findSticker());
    }

    @PostMapping("/sticker")
    public BaseResponse saveSticker(StickerRequest stickerRequest) {
        Long userSequence = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        myRoomService.addSticker(userSequence,stickerRequest);

        return new BaseResponse(null);
    }

    @DeleteMapping("/sticker/{userStickerSeq}")
    public BaseResponse removeMyRoomByStickerSeq(@PathVariable("userStickerSeq") Long userStickerSeq) {
        Long userSequence = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        myRoomService.removeMyRoomByStickerSeq(userSequence,userStickerSeq);
        return new BaseResponse(null);
    }

    @DeleteMapping("/sticker")
    public BaseResponse removeMyRoom() {
        Long userSequence = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        myRoomService.removeMyRoom(userSequence);
        return new BaseResponse(null);
    }

    @GetMapping("")
    public BaseResponse myRoomList(@RequestParam(name = "userSeq",required = false) Long userSeq)
    {
        if(null == userSeq) {
            Long userSequence = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
            return new BaseResponse(myRoomService.findMyRoomByUserSeq(userSequence));
        }
        else{
            return new BaseResponse(myRoomService.findMyRoomByUserSeq(userSeq));
        }
    }


    @GetMapping("/photo")
    public BaseResponse myRoomPhotoDetails(){
        Long userSequence = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return new BaseResponse(myRoomService.findMyRoomPhotoByUserSeq(userSequence));
    }

    @PostMapping("/photo")
    public BaseResponse updateMyRoomPhoto(@RequestPart MultipartFile photoImage){
        Long userSequence = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        String photoImagePath = s3UploadService.upload(photoImage, "user");
        myRoomService.modifyMyRoomPhoto(userSequence,photoImagePath);

        return new BaseResponse(myRoomService.findMyRoomPhotoByUserSeq(userSequence));
    }

    @DeleteMapping("/photo")
    public BaseResponse removeMyRoomPhoto(){
        Long userSequence = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        myRoomService.modifyMyRoomPhoto(userSequence,null);

        return new BaseResponse(null);
    }
}
