package com.grouproom.xyz.domain.azt.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class AztRequest {

    private Long aztSeq;
    private String name;
    private List<MemberRequest> members;
}
