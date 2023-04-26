package com.grouproom.xyz.domain.album.repository;

import com.grouproom.xyz.domain.album.dto.response.AlbumResponse;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface AlbumRepositoryCustom {

    List<AlbumResponse> findAlbumsByUserSeq(Long userSeq, Long aztSeq, LocalDateTime date);
    List<AlbumResponse> findAlbumsByUserSeqAndCoordinate(Long userSeq, Long aztSeq, BigDecimal latitude, BigDecimal longitude, LocalDateTime date);
}