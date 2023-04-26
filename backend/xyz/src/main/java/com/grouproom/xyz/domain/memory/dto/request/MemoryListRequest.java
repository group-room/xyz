package com.grouproom.xyz.domain.memory.dto.request;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class MemoryListRequest {

    private Long aztSeq;
    private Long memorySeq;
    private Boolean isLocationBased;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private BigDecimal latitude;
    private BigDecimal longitude;
}