package com.grouproom.xyz.domain.tc.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class TcListResponse {
    private List<TcResponse> timecapsules;

    @Builder
    public TcListResponse(List<TcResponse> tcResponses) {
        this.timecapsules = tcResponses;
    }
}
