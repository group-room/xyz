package com.grouproom.xyz.domain.memory.dto.request;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ModifyMemoryRequest {

    private String content;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime date;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String location;
}
