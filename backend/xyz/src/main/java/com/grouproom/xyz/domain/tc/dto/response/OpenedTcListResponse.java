package com.grouproom.xyz.domain.tc.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class OpenedTcListResponse {
    private List<OpenedTcResponse> timecapsules;

    @Builder
    public OpenedTcListResponse(List<OpenedTcResponse> openedTcResponses) {
        this.timecapsules = openedTcResponses;
    }
}
