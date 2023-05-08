package com.grouproom.xyz.domain.notification.service;

import com.grouproom.xyz.domain.notification.dto.response.NotificationListResponse;
import com.grouproom.xyz.domain.notification.dto.response.NotificationResponse;
import com.grouproom.xyz.domain.notification.entity.Notification;
import com.grouproom.xyz.domain.notification.entity.NotificationType;
import com.grouproom.xyz.domain.notification.repository.NotificationRepository;
import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.domain.user.repository.UserRepository;
import com.grouproom.xyz.global.exception.ErrorResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import static com.grouproom.xyz.domain.notification.controller.SseController.sseEmitters;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final UserRepository userRepository;
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
            if (!notification.getIsReceived()) {
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

    @Override
    @Transactional
    public void addNotification(Long userSeq, Long targetSeq, NotificationType notificationType, String content) {
        User user = userRepository.findBySequence(userSeq);
        Notification notification = Notification.builder()
                .user(user)
                .notificationType(notificationType)
                .targetSeq(targetSeq)
                .content(content)
                .build();
        notificationRepository.save(notification);

        notifyEvent(notification);
    }

    @Override
    @Transactional
    public void notifyEvent(Notification notification) {
        Long userSeq = notification.getUser().getSequence();
        if (sseEmitters.containsKey(userSeq)) {
            SseEmitter sseEmitter = sseEmitters.get(userSeq);
            try {
                sseEmitter.send(SseEmitter.event().name("newNotification").data("새로운 알림이 있습니다."));
            } catch (Exception e) {
                sseEmitters.remove(userSeq);
            }
        }
    }
}
