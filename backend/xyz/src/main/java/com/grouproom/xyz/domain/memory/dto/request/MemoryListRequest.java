package com.grouproom.xyz.domain.memory.dto.request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class MemoryListRequest {

    private String date;
    private Long aztSeq;
    private Long memorySeq;
    private Boolean isLocationBased;
    private BigDecimal latitude;
    private BigDecimal longitude;
}