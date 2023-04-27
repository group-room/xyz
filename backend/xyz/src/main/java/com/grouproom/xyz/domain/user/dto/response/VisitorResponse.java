package com.grouproom.xyz.domain.user.dto.response;

import com.grouproom.xyz.domain.user.entity.ModifierColor;
import com.grouproom.xyz.domain.user.entity.ModifierGrade;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * packageName    : com.grouproom.xyz.domain.user.dto.response
 * fileName       : VisitorResponse
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
public class VisitorResponse {
    private Long userSeq;
    private Long visitorSeq;
    private String nickname;
    private String profileImage;
    private String modifier;
    private String modifierColor;
    private String modifierGrade;
    private String content;
    private String createdTime;

    public VisitorResponse(Long userSeq, Long visitorSeq, String nickname, String profileImage, String modifier, ModifierColor modifierColor, ModifierGrade modifierGrade, String content, LocalDateTime createdTime) {
        this.userSeq = userSeq;
        this.visitorSeq = visitorSeq;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.modifier = modifier;
        if(modifierColor != null) this.modifierColor = modifierColor.getLabel();
        if(modifierGrade != null) this.modifierGrade = modifierGrade.getLabel();
        this.content = content;
        if(createdTime != null) this.createdTime = createdTime.toString();
    }
}
