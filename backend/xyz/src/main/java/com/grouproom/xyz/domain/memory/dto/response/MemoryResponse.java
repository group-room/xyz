package com.grouproom.xyz.domain.memory.dto.response;

import com.grouproom.xyz.domain.memory.entity.Accessibility;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class MemoryResponse {
    private Long memorySeq;
    //    private String memoryImage;
    private String accessibility;
    private Long aztSeq;
    private String aztName;
    //    private String date;
    private BigDecimal latitude;
    private BigDecimal longitude;
//    private String location;

    public MemoryResponse(Long memorySeq, Accessibility accessibility, Long aztSeq, String aztName, BigDecimal latitude, BigDecimal longitude) {
        this.memorySeq = memorySeq;
//        this.memoryImage = memoryImage
        this.accessibility = accessibility.toString();
        this.aztSeq = aztSeq;
        this.aztName = aztName;
//        this.date = date.toString();
        this.latitude = latitude;
        this.longitude = longitude;
//        this.location = location;
    }
}