package com.grouproom.xyz.domain.user.entity;

import com.grouproom.xyz.global.model.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * packageName    : com.grouproom.xyz.domain.user.entity
 * fileName       : Visitor
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
public class Visitor extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sequence", nullable = false)
    private Long sequence;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_sequence")
    private User fromUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_sequence")
    private User toUser;

    @Column(name = "content", length = 100)
    private String content;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) default 0")
    private Boolean isDeleted;

    @Builder
    public Visitor(User fromUser, User toUser, String content) {
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.content = content;
        this.isDeleted = false;
    }
}
