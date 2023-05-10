package com.grouproom.xyz.domain.myroom.service;

import com.grouproom.xyz.domain.myroom.dto.response.MyRoomResponse;
import com.grouproom.xyz.domain.myroom.dto.response.StickerResponse;
import com.grouproom.xyz.domain.myroom.entity.Sticker;
import com.grouproom.xyz.domain.myroom.entity.UserSticker;
import com.grouproom.xyz.domain.myroom.repository.StickerRepository;
import com.grouproom.xyz.domain.myroom.dto.request.StickerRequest;
import com.grouproom.xyz.domain.myroom.repository.UserStickerRepository;
import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.domain.user.repository.UserRepository;
import com.grouproom.xyz.global.exception.ErrorResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
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
    private final UserStickerRepository userStickerRepository;
    private final UserRepository userRepository;

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

    @Override
    @Transactional
    public void addSticker(Long userSeq, StickerRequest stickerRequest) {
        User user = userRepository.findById(userSeq)
                .orElseThrow( () -> new ErrorResponse(HttpStatus.UNAUTHORIZED,"로그인 되어 있지 않습니다."));
        Sticker sticker = stickerRepository.findById(stickerRequest.getStickerSeq())
                .orElseThrow( () -> new ErrorResponse(HttpStatus.BAD_REQUEST,"없는 스티커입니다."));

        userStickerRepository.save(
            UserSticker.builder()
                    .user(user)
                    .sticker(sticker)
                    .xLocation(BigDecimal.valueOf(stickerRequest.getX()))
                    .yLocation(BigDecimal.valueOf(stickerRequest.getY()))
                    .build()
        );
    }

    @Override
    @Transactional
    public void removeMyRoomByStickerSeq(Long userSeq, Long userStickerSeq) {
        User user = userRepository.findById(userSeq)
                .orElseThrow( () -> new ErrorResponse(HttpStatus.UNAUTHORIZED,"로그인 되어 있지 않습니다."));
        UserSticker userSticker = userStickerRepository
                .findById(userStickerSeq)
                .orElseThrow( () -> new ErrorResponse(HttpStatus.BAD_REQUEST,"없는 스티커입니다."));
        if(!user.equals(userSticker.getUser())) throw new ErrorResponse(HttpStatus.UNAUTHORIZED,"삭제 권한이 없습니다.");
        userStickerRepository.delete(userSticker);
    }

    @Override
    @Transactional
    public void removeMyRoom(Long userSeq) {
        User user = userRepository.findById(userSeq)
                .orElseThrow( () -> new ErrorResponse(HttpStatus.UNAUTHORIZED,"로그인 되어 있지 않습니다."));
        userStickerRepository.deleteUserStickerByUser(user);

    }

    @Override
    public List<MyRoomResponse> findMyRoomByUserSeq(Long userSeq) {
        return userStickerRepository.selectMyRoomByUserSeq(userSeq);
    }
}
