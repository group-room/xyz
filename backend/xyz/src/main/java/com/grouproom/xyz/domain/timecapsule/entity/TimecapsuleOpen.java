package com.grouproom.xyz.domain.timecapsule.entity;

import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.global.model.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@IdClass(UserTimecapsuleId.class)
@Table(name = "timecapsule_open")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TimecapsuleOpen extends BaseTimeEntity {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_sequence")
    private User user;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "timecapsule_sequence")
    private Timecapsule timecapsule;
}
