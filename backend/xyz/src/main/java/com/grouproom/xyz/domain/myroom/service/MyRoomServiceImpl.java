package com.grouproom.xyz.domain.myroom.service;

import com.grouproom.xyz.domain.myroom.dto.response.StickerResponse;
import com.grouproom.xyz.domain.myroom.entity.Sticker;
import com.grouproom.xyz.domain.myroom.repository.StickerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

/**
 * packageName    : com.grouproom.xyz.domain.user.service
 * fileName       : MyRoomServiceImpl
 * author         : SSAFY
 * date           : 2023-05-01
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-05-01        SSAFY       최초 생성
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MyRoomServiceImpl implements MyRoomService {

    private final StickerRepository stickerRepository;

    @Override
    @Transactional
    public void removeAllStickers() {
        stickerRepository.deleteAllSticker();
    }

    @Override
    @Transactional
    public void addStickersFromS3Asset(List<HashMap> assets) {
        for (HashMap asset : assets) {
            stickerRepository.save(Sticker.builder()
                    .image((String) asset.get("image"))
                    .name((String) asset.get("name"))
                    .build());
        }
    }

    @Override
    public List<StickerResponse> findSticker() {
        return stickerRepository.selectSticker();
    }
}
