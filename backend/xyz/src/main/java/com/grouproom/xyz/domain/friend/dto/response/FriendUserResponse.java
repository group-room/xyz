package com.grouproom.xyz.domain.friend.dto.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FriendUserResponse extends UserResponse {

    private Long chatSeq;

}
