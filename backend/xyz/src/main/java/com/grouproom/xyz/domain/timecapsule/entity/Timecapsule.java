package com.grouproom.xyz.domain.timecapsule.entity;

import com.grouproom.xyz.domain.azt.entity.Azt;
import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.global.model.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Timecapsule extends BaseTimeEntity {

    @Id
    @Column(name = "sequence")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sequence;

    @Column(name = "open_start")
    private LocalDateTime openStart;

    @Column(name = "open_end")
    private LocalDateTime openEnd;

    @Column(name = "update_end")
    private LocalDateTime updateEnd;

    @Column(name = "latitude", precision = 10, scale = 6)
    private BigDecimal latitude;

    @Column(name = "longitude", precision = 10, scale = 6)
    private BigDecimal longitude;

    @Column(name = "location")
    private String location;

    @Column(name = "is_opened", columnDefinition = "tinyint(1) default 0")
    private Boolean isOpened;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_sequence")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "azt_sequence")
    private Azt azt;
}
