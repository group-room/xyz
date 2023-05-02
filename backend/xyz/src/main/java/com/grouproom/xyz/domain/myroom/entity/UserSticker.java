package com.grouproom.xyz.domain.myroom.entity;

import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.global.model.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * packageName    : com.grouproom.xyz.domain.myroom.entity
 * fileName       : UserSticker
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
public class UserSticker extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sequence", nullable = false)
    private Long sequence;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_sequence")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sticker_sequence")
    private Sticker sticker;

    @Column(name = "x_location")
    BigDecimal xLocation;
    
    @Column(name = "y_location")
    BigDecimal yLocation;

    @Builder
    public UserSticker(User user, Sticker sticker, BigDecimal xLocation, BigDecimal yLocation) {
        this.user = user;
        this.sticker = sticker;
        this.xLocation = xLocation;
        this.yLocation = yLocation;
    }
}
