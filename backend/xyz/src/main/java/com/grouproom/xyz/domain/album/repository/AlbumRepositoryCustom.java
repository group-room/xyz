package com.grouproom.xyz.domain.album.repository;

import com.grouproom.xyz.domain.album.dto.response.AlbumResponse;

import java.time.LocalDateTime;
import java.util.List;

public interface AlbumRepositoryCustom {

    List<AlbumResponse> findAlbumsByUserSeq(Long userSeq, Long aztSeq, LocalDateTime date);
}