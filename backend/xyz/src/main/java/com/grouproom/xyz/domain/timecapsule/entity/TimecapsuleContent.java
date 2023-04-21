package com.grouproom.xyz.domain.timecapsule.entity;

import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.global.model.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "timecapsule_content")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TimecapsuleContent extends BaseTimeEntity {

    @Id
    @Column(name = "sequence")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sequence;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_sequence")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "timecapsule_sequence")
    private Timecapsule timecapsuleSequence;

    @Column(length = 200, name = "content")
    private String content;
}
