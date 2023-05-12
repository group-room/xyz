package com.grouproom.xyz.domain.chat.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class RoomMemberResponse {

    private Long userSeq;
    private String profileImage;
    private String nickname;
}
