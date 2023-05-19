package com.grouproom.xyz.domain.tc.dto.response;

import com.grouproom.xyz.domain.tc.entity.OpenStatus;
import com.grouproom.xyz.domain.tc.entity.Tc;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TcResponse {
    private Long tcSeq;
    private Long aztSeq;
    private String aztName;
    private String aztImage;
    private String openStatus;
    private String openStart;
    private String openEnd;
    private String updatedAt;
    private String location;
    private Long requiredCnt;
    private Long openCnt;

    public TcResponse(Long tcSeq, Long aztSeq, String aztName, String aztImage, OpenStatus openStatus, LocalDateTime openStart, LocalDateTime openEnd, LocalDateTime updatedAt, String location) {
        this.tcSeq = tcSeq;
        this.aztSeq = aztSeq;
        this.aztName = aztName;
        this.aztImage = aztImage;
        this.openStatus = openStatus.toString();
        this.openStart = openStart.toString();
        this.openEnd = openEnd.toString();
        this.updatedAt = updatedAt.toString();
        this.location = location;
        this.openCnt = 0L;
    }

    @Builder
    public TcResponse(Tc tc, Long requiredCnt) {
        this.tcSeq = tc.getSequence();
        this.aztSeq = tc.getAzt().getSequence();
        this.aztName = tc.getAzt().getAztName();
        this.aztImage = tc.getAzt().getAztImage();
        this.openStatus = tc.getOpenStatus().toString();
        this.openStart = tc.getOpenStart().toString();
        this.openEnd = tc.getOpenEnd().toString();
        this.updatedAt = tc.getUpdatedAt().toString();
        this.location = tc.getLocation();
        this.requiredCnt = requiredCnt;
        this.openCnt = 0L;
    }
}