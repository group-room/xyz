package com.grouproom.xyz.domain.notification.service;

import com.grouproom.xyz.domain.notification.dto.response.NotificationListResponse;
import com.grouproom.xyz.domain.notification.dto.response.NotificationResponse;
import com.grouproom.xyz.domain.notification.entity.Notification;
import com.grouproom.xyz.domain.notification.entity.NotificationType;
import com.grouproom.xyz.domain.notification.repository.NotificationRepository;
import com.grouproom.xyz.global.exception.ErrorResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.notification.service.NotificationServiceImpl");

    @Override
    @Transactional(readOnly = true)
    public NotificationListResponse findNotificationList(Long userSeq, String type) {
        logger.info("findNotificationList 호출");

        List<Notification> notifications;

        if (type == null) {
            notifications = notificationRepository.findNotificationsByUser_SequenceAndIsDeleted(userSeq, false);
        } else {
            notifications = notificationRepository.findNotificationsByUser_SequenceAndIsDeletedAndNotificationType(userSeq, false, NotificationType.valueOf(type));
        }

        List<NotificationResponse> notificationResponses = new ArrayList<>();

        for (Notification notification : notifications) {
            notificationResponses.add(new NotificationResponse(notification));
            if (notification.getIsReceived() == false) {
                notification.updateIsReceived();
            }
        }

        return NotificationListResponse.builder()
                .notifications(notificationResponses)
                .build();
    }

    @Override
    @Transactional
    public void removeNotification(Long userSeq, Long notificationSeq) {
        logger.info("removeNotification 호출");

        Notification notification = notificationRepository.findBySequenceAndUser_SequenceAndIsDeleted(notificationSeq, userSeq, false);

        if (notification == null) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "알림 삭제 실패");
        }

        notification.updateIsDeleted();
    }
}
