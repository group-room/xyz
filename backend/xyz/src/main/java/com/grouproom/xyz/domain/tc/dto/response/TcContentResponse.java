package com.grouproom.xyz.domain.tc.dto.response;

import com.grouproom.xyz.domain.tc.entity.TcContent;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class TcContentResponse {

    private Long userSeq;
    private String nickname;
    private String profileImage;
    private String content;
    private List<TcContentFileResponse> files;

    @Builder
    public TcContentResponse(TcContent tcContent, List<TcContentFileResponse> files) {
        this.userSeq = tcContent.getUser().getSequence();
        this.nickname = tcContent.getUser().getNickname();
        this.profileImage = tcContent.getUser().getProfileImage();
        this.content = tcContent.getContent();
        this.files = files;
    }
}
