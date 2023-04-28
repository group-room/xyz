package com.grouproom.xyz.domain.azt.entity;

import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.global.model.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@Builder
@AllArgsConstructor
@Getter
@Setter
@Entity
@IdClass(AztMemberId.class)
@Table(name = "azt_member")
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

    @Column(name = "is_deleted", columnDefinition = "tinyint(1)")
    private Boolean isDeleted;
}
