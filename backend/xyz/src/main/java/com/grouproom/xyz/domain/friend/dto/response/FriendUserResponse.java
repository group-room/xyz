package com.grouproom.xyz.domain.friend.dto.response;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class FriendUserResponse {

    private Long userSeq;
    private String nickname;
    private String profileImage;
    private String identify;
}
