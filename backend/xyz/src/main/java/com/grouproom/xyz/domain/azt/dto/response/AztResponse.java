package com.grouproom.xyz.domain.azt.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AztResponse {

    Long aztSeq;
    String image;
    String name;
    String createdAt;
    String updatedAt;
    String chatId;
    List<MemberResponse> members;

}
