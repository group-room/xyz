package com.grouproom.xyz.domain.tc.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class WaitingTcListResponse {
    private List<WaitingTcResponse> timecapsules;

    @Builder
    public WaitingTcListResponse(List<WaitingTcResponse> waitingTcResponses) {
        this.timecapsules = waitingTcResponses;
    }
}
