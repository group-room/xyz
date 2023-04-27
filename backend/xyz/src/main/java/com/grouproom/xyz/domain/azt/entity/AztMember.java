package com.grouproom.xyz.domain.azt.entity;

import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.global.model.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Getter
@Entity
@IdClass(AztMemberId.class)
@Table(name = "azt_memeber")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AztMember extends BaseTimeEntity {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_sequence")
    private User user;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "azt_sequence")
    private Azt azt;

    @Column(name = "joined_at")
    @Temporal(TemporalType.DATE)
    private Date joinedAt;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) default 0")
    private Boolean isDeleated;
}
