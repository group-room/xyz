package com.grouproom.xyz.domain.myroom.dto.response;

import lombok.Data;

import java.math.BigDecimal;

/**
 * packageName    : com.grouproom.xyz.domain.myroom.dto.response
 * fileName       : MyRoomResponse
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
public class MyRoomResponse {

    private String name;
    private Long seq;
    private String link;
    private BigDecimal xLocation;
    private BigDecimal yLocation;

    public MyRoomResponse(String name, Long seq, String link, BigDecimal xLocation, BigDecimal yLocation) {
        this.name = name;
        this.seq = seq;
        this.link = link;
        this.xLocation = xLocation;
        this.yLocation = yLocation;
    }
}
