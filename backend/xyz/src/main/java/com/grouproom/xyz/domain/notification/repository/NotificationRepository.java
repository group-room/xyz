package com.grouproom.xyz.domain.notification.repository;

import com.grouproom.xyz.domain.notification.entity.Notification;
import com.grouproom.xyz.domain.notification.entity.NotificationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findNotificationsByUser_SequenceAndIsDeleted(Long userSeq, Boolean isDeleted);

    List<Notification> findNotificationsByUser_SequenceAndIsDeletedAndNotificationType(Long userSeq, Boolean isDeleted, NotificationType notificationType);

    Notification findBySequenceAndUser_SequenceAndIsDeleted(Long sequence, Long userSeq, Boolean isDeleted);

    List<Notification> findNotificationsByUser_SequenceAndIsReceivedAndIsDeleted(Long userSeq, Boolean isReceived, Boolean isDeleted);

    Notification findByUser_SequenceAndTargetSequenceAndIsDeletedAndNotificationType(Long userSeq, Long targetSeq, Boolean isDeleted, NotificationType notificationType);
}
