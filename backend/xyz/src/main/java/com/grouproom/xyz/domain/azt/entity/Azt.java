package com.grouproom.xyz.domain.azt.entity;

import com.grouproom.xyz.domain.chat.entity.Chat;
import com.grouproom.xyz.global.model.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@Entity
@Builder
@AllArgsConstructor
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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_seq")
    private Chat chatSeq;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1)")
    private Boolean isDeleted;
}
