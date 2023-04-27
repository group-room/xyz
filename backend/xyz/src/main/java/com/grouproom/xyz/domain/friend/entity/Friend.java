package com.grouproom.xyz.domain.friend.entity;

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

    @Column(name = "chat_sequence")
    private Long chatSequence;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1)")
    private Boolean isDeleted;

    @Column(name = "is_canceled", columnDefinition = "tinyint(1)")
    private Boolean isCanceled;

    @Builder
    public Friend(User fromUser, User toUser, Boolean isAccepted, Boolean isDeleted, Boolean isCanceled) {
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.isAccepted = isAccepted;
        this.isDeleted = isDeleted;
        this.isCanceled = isCanceled;
    }
}
