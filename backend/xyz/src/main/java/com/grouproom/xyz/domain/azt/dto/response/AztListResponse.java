package com.grouproom.xyz.domain.azt.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AztListResponse {

    List<AztResponse> azts;
}
