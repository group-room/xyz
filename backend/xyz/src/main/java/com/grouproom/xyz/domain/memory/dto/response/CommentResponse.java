package com.grouproom.xyz.domain.memory.dto.response;

import com.grouproom.xyz.domain.memory.entity.MemoryComment;
import lombok.Data;

@Data
public class CommentResponse {
    private Long userSeq;
    private String nickname;
    private String profileImage;
    private Long commentSeq;
    private String content;
    private String createdAt;

    public CommentResponse(MemoryComment comment) {
        this.userSeq = comment.getUser().getSequence();
        this.nickname = comment.getUser().getNickname();
        this.profileImage = comment.getUser().getProfileImage();
        this.commentSeq = comment.getSequence();
        this.content = comment.getContent();
        this.createdAt = comment.getCreatedAt().toString();
    }
}
