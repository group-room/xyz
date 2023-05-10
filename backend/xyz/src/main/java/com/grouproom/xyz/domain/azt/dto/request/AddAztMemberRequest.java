package com.grouproom.xyz.domain.azt.dto.request;

import lombok.Getter;

import java.util.List;

@Getter
public class AddAztMemberRequest extends AztRequest {

    private List<MemberRequest> members;

}
