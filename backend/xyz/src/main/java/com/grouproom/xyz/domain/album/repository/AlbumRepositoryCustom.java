package com.grouproom.xyz.domain.album.repository;

import com.grouproom.xyz.domain.album.dto.response.AlbumResponse;
import com.grouproom.xyz.domain.album.entity.Album;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface AlbumRepositoryCustom {

    List<AlbumResponse> findAlbumsByUserSeq(Long userSeq, LocalDateTime date);
    List<Album> findAlbumsByUserSeqAndCoordinate(Long userSeq, BigDecimal latitude, BigDecimal longitude, LocalDateTime date);
}