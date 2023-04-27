package com.grouproom.xyz.domain.azt.entity;

import com.grouproom.xyz.global.model.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Azt extends BaseTimeEntity {

    @Id
    @Column(name = "sequence")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sequence;

    @Column(name = "azt_name")
    private String aztName;

    @Column(name = "azt_image", length = 2083)
    private String aztImage;

    @Column(name = "chat_sequence")
    private Long chatSequence;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) default 0")
    private Boolean isDeleated;
}
