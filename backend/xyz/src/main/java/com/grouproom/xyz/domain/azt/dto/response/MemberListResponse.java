package com.grouproom.xyz.domain.azt.dto.response;

import lombok.*;

import java.util.List;

@Builder
@Getter
public class MemberListResponse {

    private List<MemberResponse> members;
}
