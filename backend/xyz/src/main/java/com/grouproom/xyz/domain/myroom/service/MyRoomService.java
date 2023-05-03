package com.grouproom.xyz.domain.myroom.service;

import com.grouproom.xyz.domain.myroom.dto.response.MyRoomResponse;
import com.grouproom.xyz.domain.myroom.dto.response.StickerResponse;
import com.grouproom.xyz.domain.myroom.dto.request.StickerRequest;

import java.util.HashMap;
import java.util.List;

public interface MyRoomService {
    void removeAllStickers();
    void addStickersFromS3Asset(List<HashMap> assets);
    List<StickerResponse> findSticker();
    void addSticker(Long userSeq, StickerRequest stickerRequest);
    void removeMyRoomByStickerSeq(Long userSeq,Long stickerSeq);
    void removeMyRoom(Long userSeq);
    List<MyRoomResponse> findMyRoomByUserSeq(Long userSeq);
}
