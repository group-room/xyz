package com.grouproom.xyz.domain.user.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * packageName    : com.grouproom.xyz.domain.user.entity
 * fileName       : Nickname
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
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Nickname {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sequence", nullable = false)
    private Long sequence;

    @Column(name = "nickname",length = 100)
    private String nickname;
}
