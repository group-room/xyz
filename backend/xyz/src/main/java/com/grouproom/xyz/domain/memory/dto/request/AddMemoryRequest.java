package com.grouproom.xyz.domain.memory.dto.request;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
public class AddMemoryRequest {

    private String content;
    private String accessibility;
    private Long aztSeq;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String location;
    private List<MultipartFile> images;
    private List<MultipartFile> audios;
}
