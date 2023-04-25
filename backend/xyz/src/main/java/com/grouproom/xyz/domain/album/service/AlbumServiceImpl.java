package com.grouproom.xyz.domain.album.service;

import com.grouproom.xyz.domain.album.dto.request.AlbumListRequest;
import com.grouproom.xyz.domain.album.dto.response.AlbumResponse;
import com.grouproom.xyz.domain.album.repository.AlbumRepository;
import com.grouproom.xyz.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

        // TODO: date 처리 필요
        if (albumListRequest.getIsLocationBased() == false) {
            logger.info("isLocationBased == false");
            return albumRepository.findAlbumsByUserSeq(loginUserSeq, albumListRequest.getAztSeq(), null);
        }

        logger.info("isLocationBased == true");
        return albumRepository.findAlbumsByUserSeqAndCoordinate(loginUserSeq, albumListRequest.getAztSeq(), albumListRequest.getLatitude(), albumListRequest.getLongitude(), null);
    }
}
