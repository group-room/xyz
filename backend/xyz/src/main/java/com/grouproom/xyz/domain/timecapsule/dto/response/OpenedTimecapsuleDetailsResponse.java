package com.grouproom.xyz.domain.timecapsule.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class OpenedTimecapsuleDetailsResponse {
    private OpenedTimecapsuleResponse timecapsule;
    private List<TimecapsuleContentResponse> contents;
}
