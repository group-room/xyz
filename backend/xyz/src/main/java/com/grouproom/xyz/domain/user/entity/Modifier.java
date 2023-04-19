package com.grouproom.xyz.domain.user.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * packageName    : com.grouproom.xyz.domain.user.entity
 * fileName       : Modifier
 * author         : SSAFY
 * date           : 2023-04-19
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-04-19        SSAFY       최초 생성
 */
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Modifier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sequence", nullable = false)
    private Long sequence;

    @Column(name = "name", length = 200)
    private String name;

    @Column(name = "modifier_color")
    private ModifierColor modifierColor;

    @Column(name = "modifier_grade")
    private ModifierGrade modifierGrade;

}
