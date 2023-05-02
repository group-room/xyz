package com.grouproom.xyz.domain.timecapsule.dto.reqeust;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class AddTimecapsuleRequest {
    private String content;
    private Long aztSeq;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updateEnd;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime openStart;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime openEnd;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String location;
}
