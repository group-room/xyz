package com.grouproom.xyz.domain.user.dto.request;

import lombok.Data;

/**
 * packageName    : com.grouproom.xyz.domain.user.dto.request
 * fileName       : visitorRequest
 * author         : SSAFY
 * date           : 2023-05-17
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-05-17        SSAFY       최초 생성
 */
@Data
public class VisitorRequest {
    private Long userSeq;
    private String content;
}
