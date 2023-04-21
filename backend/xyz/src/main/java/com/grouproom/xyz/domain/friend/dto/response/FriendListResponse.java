package com.grouproom.xyz.domain.friend.dto.response;

import com.grouproom.xyz.global.model.BaseResponse;

import java.util.List;

public class FriendListResponse extends BaseResponse {

    public FriendListResponse(List<FriendUserResponse> friendUserResponseList) {
        super(friendUserResponseList);
    }
}
