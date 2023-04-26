package com.grouproom.xyz.domain.friend.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserListResponse {

    private List<UserResponse> users;
}
