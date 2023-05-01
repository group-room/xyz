package com.grouproom.xyz.domain.myroom.dto.request;

import lombok.Data;

/**
 * packageName    : com.grouproom.xyz.domain.user.dto.request
 * fileName       : StickerRequest
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
public class StickerRequest {
    private Long stickerSeq;
    private Double x;
    private Double y;
}
