package com.grouproom.xyz.domain.notification.dto.response;

import com.grouproom.xyz.domain.notification.entity.Notification;
import lombok.Data;

@Data
public class NotificationResponse {
    private String type;
    private Long notificationSeq;
    private Long userSeq;
    private Long targetSeq;
    private String content;
    private String fromUserName;
    private Boolean isReceived;

    public NotificationResponse(Notification notification) {
        this.type = notification.getNotificationType().toString();
        this.notificationSeq = notification.getSequence();
        this.userSeq = notification.getUser().getSequence();
        this.targetSeq = notification.getTargetSequence();
        this.content = notification.getContent();
        this.fromUserName = notification.getFromUserName();
        this.isReceived = notification.getIsReceived();
    }

}