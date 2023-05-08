package com.grouproom.xyz.domain.notification.service;

import com.grouproom.xyz.domain.notification.dto.response.NotificationListResponse;
import com.grouproom.xyz.domain.notification.entity.Notification;

public interface NotificationService {

    NotificationListResponse findNotificationList(Long userSeq, String type);

    void removeNotification(Long userSeq, Long notificationSeq);

    void notifyEvent(Notification notification);
}
