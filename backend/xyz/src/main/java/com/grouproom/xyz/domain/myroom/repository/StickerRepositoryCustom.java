package com.grouproom.xyz.domain.myroom.repository;

import com.grouproom.xyz.domain.myroom.dto.response.StickerResponse;

import java.util.List;

public interface StickerRepositoryCustom {
    void deleteAllSticker();
    List<StickerResponse> selectSticker();

}
