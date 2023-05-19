package com.grouproom.xyz.domain.tc.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OpenedTcResponse {
    private Long tcSeq;
    private String aztName;
    private String openedAt;

    public OpenedTcResponse(Long tcSeq, String aztName, LocalDateTime updatedAt) {
        this.tcSeq = tcSeq;
        this.aztName = aztName;
        this.openedAt = updatedAt.toString();
    }
}
