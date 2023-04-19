package com.grouproom.xyz.domain.user.entity;

import com.grouproom.xyz.global.model.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * packageName    : com.grouproom.xyz.domain.user.entity
 * fileName       : UserModifier
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
@Table(name = "user_modifier")
@IdClass(UserModifierID.class)
public class UserModifier extends BaseTimeEntity {
    @Id
    @Column(name = "user_sequence")
    private User user;

    @Id
    @Column(name = "modifier_sequence")
    private Modifier modifier;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) default 0")
    private Boolean isDeleted;
}
