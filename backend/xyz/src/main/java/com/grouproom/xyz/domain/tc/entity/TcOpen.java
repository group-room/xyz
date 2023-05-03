package com.grouproom.xyz.domain.tc.entity;

import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.global.model.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@IdClass(UserTcId.class)
@Table(name = "tc_open")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TcOpen extends BaseTimeEntity {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_sequence")
    private User user;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tc_sequence")
    private Tc tc;
}
