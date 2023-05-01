package com.grouproom.xyz.domain.myroom.dto.response;

import lombok.Data;

/**
 * packageName    : com.grouproom.xyz.domain.myroom.dto.response
 * fileName       : StickerResponse
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
@Data
public class StickerResponse {

    private Long seq;
    private String name;
    private String link;

    public StickerResponse(Long seq, String name, String link) {
        this.seq = seq;
        this.name = name;
        this.link = link;
    }
}
