package com.grouproom.xyz.domain.user.dto.response;

import com.grouproom.xyz.domain.user.entity.ModifierColor;
import com.grouproom.xyz.domain.user.entity.ModifierGrade;
import lombok.Data;

import java.util.List;

/**
 * packageName    : com.grouproom.xyz.domain.user.dto.response
 * fileName       : ProfileResponse
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
public class ProfileResponse {

    private String nickname;
    private Integer visitCount;
    private String backgroundImage;
    private String profileImage;
    private String introduce;
    private String modifier;
    private String modifierColor;
    private String modifierGrade;
    private String identify;
    private Boolean friend;
    private Boolean friendRequest;
    private Boolean friendResponse;
    private Long friendTime;
    private List<BgmResponse> bgms;

    public ProfileResponse(String nickname, Integer visitCount, String backgroundImage, String profileImage, String introduce, String modifier, ModifierColor modifierColor, ModifierGrade modifierGrade, String identify) {
        this.nickname = nickname;
        this.visitCount = visitCount;
        this.backgroundImage = backgroundImage;
        this.profileImage = profileImage;
        this.introduce = introduce;
        this.modifier = modifier;
        if(modifierColor != null) this.modifierColor = modifierColor.getLabel();
        if(modifierGrade != null) this.modifierGrade = modifierGrade.getLabel();
        this.identify = identify;
    }

    public void setFriend(FriendshipResponse friendshipResponse) {
        if(friendshipResponse == null) return;
        this.friend = friendshipResponse.getFriend();
        this.friendRequest = friendshipResponse.getFriendRequest();
        this.friendResponse = friendshipResponse.getFriendResponse();
        this.friendTime = friendshipResponse.getFriendTime();
    }
}
