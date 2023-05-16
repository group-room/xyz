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

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final SseService sseService;
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;
    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.notification.service.NotificationServiceImpl");

    @Override
    @Transactional
    public NotificationListResponse findNotificationList(Long userSeq, String type) {
        logger.info("findNotificationList 호출");

        List<Notification> notifications;

        if (type.equals("ALL")) {
            notifications = notificationRepository.findNotificationsByUser_SequenceAndIsDeletedOrderByCreatedAtDesc(userSeq, false);
        } else {
            notifications = notificationRepository.findNotificationsByUser_SequenceAndIsDeletedAndNotificationTypeOrderByCreatedAtDesc(userSeq, false, NotificationType.valueOf(type));
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
    public void addNotification(Long userSeq, Long targetSeq, NotificationType notificationType, String content, String fromUserName) {
        logger.info("addNotification 호출");

        User user = userRepository.getReferenceById(userSeq);
        Notification notification = Notification.builder()
                .user(user)
                .notificationType(notificationType)
                .targetSeq(targetSeq)
                .content(content)
                .fromUserName(fromUserName)
                .build();

        notificationRepository.save(notification);

        notifyEvent(notification);
    }

    @Override
    @Transactional
    public void notifyEvent(Notification notification) {
        logger.info("notifyEvent 호출");

        Long userSeq = notification.getUser().getSequence();

        if (sseService.containsSseEmitter(userSeq)) {
            SseEmitter sseEmitter = sseService.getSseEmitter(userSeq);
            try {
                sseEmitter.send(SseEmitter.event().name("newNotification").data("new notification\n\n"));
                logger.info("notify success");
            } catch (Exception e) {
                sseService.removeSseEmitter(userSeq);
            }
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Boolean checkUnreadNotifications(Long userSeq) {
        logger.info("checkUnreadNotifications 호출");

        List<Notification> notifications = notificationRepository.findNotificationsByUser_SequenceAndIsReceivedAndIsDeleted(userSeq, false, false);

        return !notifications.isEmpty();
    }
}
