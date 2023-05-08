package com.grouproom.xyz.domain.notification.entity;

import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.global.model.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notification extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sequence")
    private Long sequence;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_sequence")
    private User user;

    @Enumerated
    @Column(name = "notification_type")
    private NotificationType notificationType;

    @Column(name = "target_sequence")
    private Long targetSequence;

    @Column(length = 200, name = "content")
    private String content;

    @Column(name = "is_received")
    private Boolean isReceived;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    public void updateIsReceived() {
        isReceived = true;
    }
}