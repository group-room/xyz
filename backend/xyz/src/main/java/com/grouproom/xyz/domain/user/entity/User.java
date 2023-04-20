package com.grouproom.xyz.domain.user.entity;

import com.grouproom.xyz.global.model.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

/**
 * packageName    : com.grouproom.xyz.domain.user.entity
 * fileName       : User
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
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sequence", nullable = false)
    private Long sequence;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "visit_count")
    @ColumnDefault("0")
    private Integer visitCount;

    @Column(name = "profile_image", length = 2083)
    private String profileImage;

    @Column(name = "background_image", length = 2083)
    private String backgroundImage;

    @Column(name = "introduce", length = 100)
    private String introduce;

    @Column(name = "token", length = 500)
    private String token;

    @Enumerated
    @Column(name = "social_type")
    private SocialType socialType;

    @Column(name = "social_identify", length = 500)
    private String socialIdentify;

    @Column(name = "identify", length = 500)
    private String identify;
    
    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @Builder
    public User(SocialType socialType, String socialIdentify) {
        this.socialType = socialType;
        this.socialIdentify = socialIdentify;
        this.isDeleted = false;
    }
}
