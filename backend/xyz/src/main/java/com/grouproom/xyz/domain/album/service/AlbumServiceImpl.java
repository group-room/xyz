package com.grouproom.xyz.domain.album.service;

import com.grouproom.xyz.domain.album.dto.request.AlbumListRequest;
import com.grouproom.xyz.domain.album.dto.response.AlbumResponse;
import com.grouproom.xyz.domain.album.repository.AlbumRepository;
import com.grouproom.xyz.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class AlbumServiceImpl implements AlbumService {

    private final UserRepository userRepository;
    private final AlbumRepository albumRepository;
    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.album.service.AlbumServiceImpl");


    @Override
    @Transactional(readOnly = true)
    public List<AlbumResponse> findAlbum(Long loginUserSeq, AlbumListRequest albumListRequest) {
        logger.info("findAlbum 호출");

        if (albumListRequest.getIsLocationBased() == false) {
            logger.info("isLocationBased == false");
            return albumRepository.findAlbumsByUserSeq(loginUserSeq, albumListRequest.getAztSeq(), null);
        }

        logger.info("isLocationBased == true");

//        groupSeq 없으면 모든 public 글 + 해당 유저가 가입된 그룹의 group 글 + 해당 유저의 private 글
//        groupSeq 있으면 해당 그룹의 public, group 글 + 해당 그룹에서 작성한 해당 유저의 private 글
//        date 있으면 해당 날짜 글만 필터링
//        date 없으면 최신순
//        isLocationBased true면 위도, 경도로 필터링
//        isLocationBased false면 전체
        return null;
    }
}
