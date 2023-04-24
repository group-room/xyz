package com.grouproom.xyz.domain.friend.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class FriendListResponse {

    private List<FriendUserResponse> friends;
}
