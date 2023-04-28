package com.grouproom.xyz.domain.memory.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MemoryDetailResponse {

    private MemoryInfoResponse memory;
    private List<CommentResponse> comments;
}