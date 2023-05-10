package com.grouproom.xyz.domain.azt.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberResponse {

    private Long userSeq;
    private String nickname;
    private String identify;
    private String profileImage;
    private String chatId;
}
