package com.grouproom.xyz.domain.friend.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FriendUserResponse {

    private Long userSeq;
    private String nickname;
    private String profileImage;
    private String identify;

    @Builder
    public FriendUserResponse(Long userSeq, String nickname, String profileImage, String identify) {
        this.userSeq = userSeq;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.identify = identify;
    }
}
