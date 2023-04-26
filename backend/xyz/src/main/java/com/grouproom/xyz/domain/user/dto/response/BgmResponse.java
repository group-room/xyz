package com.grouproom.xyz.domain.user.dto.response;

import lombok.Data;

/**
 * packageName    : com.grouproom.xyz.domain.user.dto.response
 * fileName       : BgmResponse
 * author         : SSAFY
 * date           : 2023-04-26
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-04-26        SSAFY       최초 생성
 */
@Data
public class BgmResponse {

    private String bgmTitle;
    private String bgmLink;

    public BgmResponse(String bgmTitle, String bgmLink) {
        this.bgmTitle = bgmTitle;
        this.bgmLink = bgmLink;
    }
}
