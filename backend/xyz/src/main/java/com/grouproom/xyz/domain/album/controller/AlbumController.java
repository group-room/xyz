package com.grouproom.xyz.domain.album.controller;

import com.grouproom.xyz.domain.album.dto.request.AlbumListRequest;
import com.grouproom.xyz.domain.album.dto.response.AlbumResponse;
import com.grouproom.xyz.domain.album.repository.AlbumRepository;
import com.grouproom.xyz.domain.album.repository.AlbumRepositoryCustom;
import com.grouproom.xyz.domain.album.service.AlbumService;
import com.grouproom.xyz.global.model.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/album")
@RequiredArgsConstructor
public class AlbumController {

    private final AlbumService albumService;
    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.album.controller.AlbumController");

    @GetMapping()
    public BaseResponse<?> albumList(@ModelAttribute AlbumListRequest albumListRequest) {
        logger.info("albumList 호출");
        Long loginSeq = 1L;
        List<AlbumResponse> albumResponseList = albumService.findAlbum(loginSeq, albumListRequest);
        return new BaseResponse(albumResponseList);
    }
}
