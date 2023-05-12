package com.grouproom.xyz.domain.friend.entity;

import com.grouproom.xyz.domain.chat.entity.Chat;
import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.global.model.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

/**
 * packageName    : com.grouproom.xyz.domain.friend.entity
 * fileName       : Friend
 * author         : SSAFY
 * date           : 2023-04-20
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-04-20        SSAFY       최초 생성
 */
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@Setter
@IdClass(FriendID.class)
public class Friend extends BaseTimeEntity {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_user")
    private User fromUser;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_user")
    private User toUser;

    @Column(name = "is_accepted", columnDefinition = "tinyint(1)")
    private Boolean isAccepted;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_seq")
    private Chat chatSeq;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1)")
    private Boolean isDeleted;

    @Column(name = "is_canceled", columnDefinition = "tinyint(1)")
    private Boolean isCanceled;

}
