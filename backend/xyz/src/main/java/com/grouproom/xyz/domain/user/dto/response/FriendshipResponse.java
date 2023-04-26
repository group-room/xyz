package com.grouproom.xyz.domain.user.dto.response;

import lombok.Data;

import java.time.Duration;
import java.time.LocalDateTime;

/**
 * packageName    : com.grouproom.xyz.domain.user.dto.response
 * fileName       : Friendship
 * author         : SSAFY
 * date           : 2023-04-26
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-04-26        SSAFY       최초 생성
 */
@Data
public class FriendshipResponse {

    private Boolean friend;
    private Boolean friendRequest;
    private Boolean friendResponse;
    private Long friendTime;

    public FriendshipResponse(Boolean friend, Boolean friendRequest, Boolean friendResponse, LocalDateTime updateTime) {
        Duration  diff = Duration.between(updateTime, LocalDateTime.now());
        this.friend = friend;
        this.friendRequest = friendRequest;
        this.friendResponse = friendResponse;
        this.friendTime = diff.getSeconds()/86400;
    }
}
