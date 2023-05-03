package com.grouproom.xyz.domain.tc.dto.response;

import com.grouproom.xyz.domain.tc.entity.OpenStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class WaitingTcResponse {
    private Long tcSeq;
    private Long aztSeq;
    private String aztName;
    private String openStatus;
    private String openStart;
    private String openEnd;
    private String location;
    private Integer requiredCnt;
    private Integer openerCnt;

    public WaitingTcResponse(Long tcSeq, Long aztSeq, String aztName, OpenStatus openStatus, LocalDateTime openStart, LocalDateTime openEnd, String location, Integer requiredCnt, Integer openerCnt) {
        this.tcSeq = tcSeq;
        this.aztSeq = aztSeq;
        this.aztName = aztName;
        this.openStatus = openStatus.toString();
        this.openStart = openStart.toString();
        this.openEnd = openEnd.toString();
        this.location = location;
        this.requiredCnt = requiredCnt;
        this.openerCnt = openerCnt;
    }
}
