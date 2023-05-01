package com.grouproom.xyz.domain.azt.dto.request;

import lombok.Getter;

import java.util.List;

@Getter
public class AddAztRequest {

    private String name;
    private List<MemberRequest> members;
}
