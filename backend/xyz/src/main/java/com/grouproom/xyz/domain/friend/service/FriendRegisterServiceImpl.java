package com.grouproom.xyz.domain.friend.service;

import com.grouproom.xyz.domain.friend.entity.Friend;
import com.grouproom.xyz.domain.friend.entity.UserBlock;
import com.grouproom.xyz.domain.friend.repository.FriendRepository;
import com.grouproom.xyz.domain.friend.repository.UserBlockRepository;
import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class FriendRegisterServiceImpl implements FriendRegisterService {

    private final UserRepository userRepository;
    private final UserBlockRepository userBlockRepository;
    private final FriendRepository friendRepository;
    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.friend.service.FriendRegisterServiceImpl");


    @Override
    @Transactional
    public String saveFriendRequest(Long loginSeq, Long userSeq) {

        logger.info("saveFriendRequest 호출");

        User loginUser = userRepository.findBySequence(loginSeq);
        User targetUser = userRepository.findBySequence(userSeq);
        if(null == targetUser) {
            logger.severe("없는 유저");
            throw new RuntimeException();
        }
        UserBlock block1 = userBlockRepository.findByFromUserAndToUserAndIsDeleted(loginUser, targetUser, false);
        UserBlock block2 = userBlockRepository.findByFromUserAndToUserAndIsDeleted(targetUser, loginUser, false);
        if(null != block1 || null != block2) {
            logger.severe("차단 상태이므로 요청 불가");
            throw new RuntimeException();
        }
        Friend friend1 = friendRepository.findByFromUserAndToUser(loginUser, targetUser);
        Friend friend2 = friendRepository.findByFromUserAndToUser(targetUser, loginUser);
        if(null == friend1 && null == friend2) {
            logger.info("최초 요청");
            Friend friend = Friend.builder()
                    .fromUser(loginUser)
                    .toUser(targetUser)
                    .isAccepted(false)
                    .isCanceled(false)
                    .isDeleted(false)
                    .build();
            friend.setCreatedAt(LocalDateTime.now());
            friendRepository.save(friend);
        } else if(null != friend1 && (friend1.getIsCanceled() || friend1.getIsDeleted())) {
        logger.info(friend1.getIsCanceled().toString());
        logger.info(friend1.getIsDeleted().toString());
            logger.info("요청 취소 상태 또는 친구 삭제 상태 : 과거 신청 주체가 로그인 유저");
            friend1.setCreatedAt(LocalDateTime.now());
            friend1.setIsAccepted(false);
            friend1.setIsCanceled(false);
            friend1.setIsDeleted(false);
        } else if(null != friend2 && (friend2.getIsCanceled() || friend2.getIsDeleted())) {
        logger.info(friend2.getIsCanceled().toString());
        logger.info(friend2.getIsDeleted().toString());
            logger.info("요청 취소 상태 또는 친구 삭제 상태 : 과거 신청 주체가 타겟 유저");
            friend2.setFromUser(loginUser);
            friend2.setToUser(targetUser);
            friend2.setCreatedAt(LocalDateTime.now());
            friend2.setIsAccepted(false);
            friend2.setIsCanceled(false);
            friend2.setIsDeleted(false);
        } else {
            logger.severe("이미 친구");
            throw new RuntimeException();
        }
        return "";
    }

}
