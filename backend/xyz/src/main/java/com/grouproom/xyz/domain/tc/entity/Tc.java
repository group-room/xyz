package com.grouproom.xyz.domain.tc.entity;

import com.grouproom.xyz.domain.azt.entity.Azt;
import com.grouproom.xyz.domain.tc.dto.reqeust.AddTcRequest;
import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.global.model.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Tc extends BaseTimeEntity {

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

    @Enumerated
    @Column(name = "open_status")
    private OpenStatus openStatus;

    @Column(name = "latitude", precision = 10, scale = 7)
    private BigDecimal latitude;

    @Column(name = "longitude", precision = 10, scale = 7)
    private BigDecimal longitude;

    @Column(name = "location")
    private String location;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_sequence")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "azt_sequence")
    private Azt azt;

    @Builder
    public Tc(User user, Azt azt, AddTcRequest addTcRequest) {
        this.openStart = addTcRequest.getOpenStart();
        this.openEnd = addTcRequest.getOpenEnd();
        this.updateEnd = addTcRequest.getUpdateEnd();
        this.latitude = addTcRequest.getLatitude();
        this.longitude = addTcRequest.getLongitude();
        this.location = addTcRequest.getLocation();
        this.openStatus = OpenStatus.UPDATABLE;
        this.user = user;
        this.azt = azt;
    }

    public void updateOpenStatus(OpenStatus openStatus) {
        this.openStatus = openStatus;
    }
}
