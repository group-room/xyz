package com.grouproom.xyz.domain.timecapsule.dto.response;

import com.grouproom.xyz.domain.timecapsule.entity.TimecapsuleContent;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class TimecapsuleContentResponse {

    private Long userSeq;
    private String nickname;
    private String profileImage;
    private String content;
    private List<TimecapsuleContentFileResponse> files;

    @Builder
    public TimecapsuleContentResponse(TimecapsuleContent timecapsuleContent, List<TimecapsuleContentFileResponse> files) {
        this.userSeq = timecapsuleContent.getUser().getSequence();
        this.nickname = timecapsuleContent.getUser().getNickname();
        this.profileImage = timecapsuleContent.getUser().getProfileImage();
        this.content = timecapsuleContent.getContent();
        this.files = files;
    }
}
