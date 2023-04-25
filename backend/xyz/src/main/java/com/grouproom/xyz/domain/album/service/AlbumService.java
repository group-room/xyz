package com.grouproom.xyz.domain.album.service;

import com.grouproom.xyz.domain.album.dto.request.AlbumListRequest;
import com.grouproom.xyz.domain.album.dto.response.AlbumResponse;

import java.util.List;

public interface AlbumService {
    List<AlbumResponse> findAlbum(Long loginUserSeq, AlbumListRequest albumListRequest);
}