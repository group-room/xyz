package com.grouproom.xyz.domain.friend.service;

import com.grouproom.xyz.domain.friend.dto.response.FriendListResponse;
import com.grouproom.xyz.domain.friend.dto.response.FriendUserResponse;
import com.grouproom.xyz.domain.friend.entity.Friend;
import com.grouproom.xyz.domain.friend.repository.FriendRepository;
import com.grouproom.xyz.domain.notification.entity.Notification;
import com.grouproom.xyz.domain.notification.entity.NotificationType;
import com.grouproom.xyz.domain.notification.repository.NotificationRepository;
import com.grouproom.xyz.domain.notification.service.NotificationService;
import com.grouproom.xyz.global.exception.ErrorResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.logging.Logger;

@RequiredArgsConstructor
@Service
public class FriendManageServiceImpl implements FriendManageService {

    private final FriendRepository friendRepository;
    private final NotificationService notificationService;
    private final NotificationRepository notificationRepository;
    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.friend.service.FriendManageServiceImpl");

    @Override
    public FriendListResponse findFriend(Long loginUserSeq) {

        logger.info("findFriend 호출");

        List<FriendUserResponse> friendUserResponseList = friendRepository.findByFromUserOrToUser(loginUserSeq, true, false, false);
        return FriendListResponse.builder()
                .friends(friendUserResponseList)
                .build();
    }

    @Override
    @Transactional
    public String modifyFriendToDeleted(Long loginSeq, Long userSeq) {

        logger.info("modifyFriendDelete 호출");

        Friend friend = friendRepository.findByFromUserAndToUser(loginSeq, userSeq, true, false, false);
        if (null == friend) {
            logger.severe("친구 아님");
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "친구 아님");
        } else {
            friend.setIsDeleted(true);
        }

        Notification notification = notificationRepository.findByUser_SequenceAndTargetSequenceAndIsDeletedAndNotificationType(loginSeq, userSeq, false, NotificationType.FRIEND);
        if (null != notification) {
            notificationService.removeNotification(loginSeq, notification.getSequence());
        }

        Notification reversedNotification = notificationRepository.findByUser_SequenceAndTargetSequenceAndIsDeletedAndNotificationType(userSeq, loginSeq, false, NotificationType.FRIEND);
        if (null != reversedNotification) {
            notificationService.removeNotification(loginSeq, reversedNotification.getSequence());
        }

        return "";
    }

    @Override
    public FriendListResponse findFriendByNickname(Long loginSeq, String nickname) {

        logger.info("findFriendByNickname 호출");

        List<FriendUserResponse> friendUserResponseList = friendRepository.findNicknameByFromUserOrToUser(loginSeq, nickname, true, false, false);
        return FriendListResponse.builder()
                .friends(friendUserResponseList)
                .build();
    }

    @Override
    public FriendListResponse findFriendByIdentify(Long loginSeq, String identify) {

        logger.info("findFriendByIdentify 호출");

        List<FriendUserResponse> friendUserResponseList = friendRepository.findIdentifyBYFromUserOrToUser(loginSeq, identify, true, false, false);
        return FriendListResponse.builder()
                .friends(friendUserResponseList)
                .build();
    }
}
