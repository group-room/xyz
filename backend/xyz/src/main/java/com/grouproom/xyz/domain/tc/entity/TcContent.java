package com.grouproom.xyz.domain.tc.entity;

import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.global.model.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "tc_content")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TcContent extends BaseTimeEntity {

    @Id
    @Column(name = "sequence")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sequence;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_sequence")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "tc_sequence")
    private Tc tc;

    @Column(length = 200, name = "content")
    private String content;

    @Builder
    public TcContent(String content, User user, Tc tc) {
        this.content = content;
        this.user = user;
        this.tc = tc;
    }
}
