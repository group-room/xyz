package com.grouproom.xyz.domain.notification.service;

import com.grouproom.xyz.domain.notification.dto.response.NotificationListResponse;

public interface NotificationService {

    NotificationListResponse findNotificationList(Long userSeq, String type);

    void removeNotification(Long userSeq, Long notificationSeq);
}
