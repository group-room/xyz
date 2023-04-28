package com.grouproom.xyz.domain.user.entity;

import com.grouproom.xyz.global.model.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.Random;

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
    public User(SocialType socialType, String socialIdentify, String nickname) {
        this.socialType = socialType;
        this.socialIdentify = socialIdentify;
        this.isDeleted = false;
        this.nickname = nickname;
        this.visitCount = 0;
        this.introduce = "소개 글을 작성해보세요.";
        String number = String.format("%02d", new Random().nextInt(50) + 1);
        this.backgroundImage = new StringBuilder().append("https://ssafy-xyz.s3.ap-northeast-2.amazonaws.com/background/").append(number).append("_PixelSky_1920x1080.png").toString();
        String number2 = String.format("%01d", new Random().nextInt(9));
        this.profileImage = new StringBuilder().append("https://ssafy-xyz.s3.ap-northeast-2.amazonaws.com/profileImg/").append(number2).append(".jpg").toString();
        String code = String.format("%06d", new Random().nextInt(1000000));
        this.identify = new StringBuilder().append("#").append(code).toString();
    }

    public void changeIsDeleted(Boolean isDeleted) {
        this.socialIdentify = this.socialIdentify + "delete";
        this.isDeleted = isDeleted;
    }

    public void changeVisitCount(Integer visitCount) {
        this.visitCount = visitCount;
    }

    public void changeProfile(String nickname, String profileImage, String backgroundImage, String introduce) {
        if (nickname != null) this.nickname = nickname;
        if (profileImage != null) this.profileImage = profileImage;
        if (backgroundImage != null) this.backgroundImage = backgroundImage;
        if (introduce != null) this.introduce = introduce;
    }

    public void changeToken(String token){
        this.token = token;
    }
}
