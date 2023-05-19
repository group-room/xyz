package com.grouproom.xyz.domain.memory.dto.response;

import com.grouproom.xyz.domain.memory.entity.Memory;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class MemoryResponse {
    private Long memorySeq;
    private String memoryImage;
    private Long aztSeq;
    private String aztName;
    private String userName;
    private String date;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String location;
    private Boolean isLiked;
    private Integer likeCnt;
    private Integer commentCnt;

    public MemoryResponse(Long memorySeq, Long aztSeq, String aztName, String userName, LocalDateTime date, BigDecimal latitude, BigDecimal longitude, String location) {
        this.memorySeq = memorySeq;
        this.aztSeq = aztSeq;
        this.aztName = aztName;
        this.userName = userName;
        this.date = date.toString();
        this.latitude = latitude;
        this.longitude = longitude;
        this.location = location;
    }

    public MemoryResponse(Memory memory) {
        this.memorySeq = memory.getSequence();
        this.aztSeq = memory.getAzt().getSequence();
        this.aztName = memory.getAzt().getAztName();
        this.userName = memory.getUser().getNickname();
        this.date = memory.getDate().toString();
        this.latitude = memory.getLatitude();
        this.longitude = memory.getLongitude();
        this.location = memory.getLocation();
    }
}