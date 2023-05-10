package com.grouproom.xyz.domain.user.dto.request;

import lombok.Data;

/**
 * packageName    : com.grouproom.xyz.domain.user.dto.request
 * fileName       : ProfileRequest
 * author         : SSAFY
 * date           : 2023-05-04
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-05-04        SSAFY       최초 생성
 */
@Data
public class ProfileRequest {
    private String nickname;
    private String introduce;
    private Long modifierSequence;
}
