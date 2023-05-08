package com.grouproom.xyz.domain.notification.service;

import com.grouproom.xyz.domain.notification.dto.response.NotificationListResponse;
import com.grouproom.xyz.domain.notification.entity.Notification;
import com.grouproom.xyz.domain.notification.entity.NotificationType;

public interface NotificationService {

    NotificationListResponse findNotificationList(Long userSeq, String type);

    void removeNotification(Long userSeq, Long notificationSeq);

    void addNotification(Long userSeq, Long targetSeq, NotificationType notificationType, String content);

    void notifyEvent(Notification notification);
}
