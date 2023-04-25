package com.grouproom.xyz.domain.timecapsule.entity;

import com.grouproom.xyz.domain.azt.entity.Azt;
import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.global.model.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
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
    @Temporal(TemporalType.DATE)
    private Date openStart;

    @Column(name = "open_end")
    @Temporal(TemporalType.DATE)
    private Date openEnd;

    @Column(name = "update_end")
    @Temporal(TemporalType.DATE)
    private Date updateEnd;

    @Column(name = "latitude")
    private BigDecimal latitude;

    @Column(name = "longitude")
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
