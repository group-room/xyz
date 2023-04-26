package com.grouproom.xyz.domain.user.dto.response;

import com.grouproom.xyz.domain.user.entity.ModifierColor;
import com.grouproom.xyz.domain.user.entity.ModifierGrade;
import lombok.Data;

/**
 * packageName    : com.grouproom.xyz.domain.user.dto.response
 * fileName       : modifierResponse
 * author         : SSAFY
 * date           : 2023-04-25
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-04-25        SSAFY       최초 생성
 */
@Data
public class ModifierResponse {

    private Long modifierSeq;
    private String name;
    private String color;
    private String grade;

    public ModifierResponse(Long modifierSeq, String name, ModifierColor color, ModifierGrade grade) {
        this.modifierSeq = modifierSeq;
        this.name = name;
        this.color = color.getLabel();
        this.grade = grade.getLabel();
    }
}
