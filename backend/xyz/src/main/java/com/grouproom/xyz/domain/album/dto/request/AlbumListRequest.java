package com.grouproom.xyz.domain.album.dto.request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class AlbumListRequest {

    private String date;
    private Long aztSeq;
    private Long albumSeq;
    private Boolean isLocationBased;
    private BigDecimal latitude;
    private BigDecimal longitude;
}