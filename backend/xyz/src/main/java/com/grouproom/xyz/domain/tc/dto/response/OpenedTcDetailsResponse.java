package com.grouproom.xyz.domain.tc.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class OpenedTcDetailsResponse {
    private OpenedTcInfoResponse tc;
    private List<TcContentResponse> contents;
}
