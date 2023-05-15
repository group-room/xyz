package com.grouproom.xyz.domain.notification.controller;

import com.grouproom.xyz.domain.notification.dto.response.NotificationListResponse;
import com.grouproom.xyz.domain.notification.service.NotificationService;
import com.grouproom.xyz.global.model.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@RestController
@RequestMapping("/notification")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.notification.controller.NotificationController");

    @GetMapping("/unread")
    public BaseResponse<?> checkUnreadNotifications() {
        logger.info("checkUnreadNotification 호출");

        Long userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        Boolean hasUnreadNotifications = notificationService.checkUnreadNotifications(userSeq);

        return new BaseResponse(hasUnreadNotifications);
    }

    @GetMapping()
    public BaseResponse<?> notificationList(@RequestParam String type) {
        logger.info("notificationList 호출");

        Long userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        NotificationListResponse notificationList = notificationService.findNotificationList(userSeq, type);

        return new BaseResponse(notificationList);
    }

    @DeleteMapping("/{notificationSeq}")
    public BaseResponse<?> removeNotification(@PathVariable("notificationSeq") Long notificationSeq) {
        logger.info("removeNotification 호출");

        Long userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        notificationService.removeNotification(userSeq, notificationSeq);

        return new BaseResponse("알림 삭제 성공");
    }
}
