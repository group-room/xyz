package com.grouproom.xyz.domain.friend.service;

import com.grouproom.xyz.domain.friend.dto.response.UserListResponse;
import com.grouproom.xyz.domain.friend.dto.response.UserResponse;
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
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class FriendRegisterServiceImpl implements FriendRegisterService {

    private final UserRepository userRepository;
    private final UserBlockRepository userBlockRepository;
    private final FriendRepository friendRepository;
    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.friend.service.FriendRegisterServiceImpl");


    @Override
    public UserListResponse findUserByNickname(Long loginSeq, String nickname) {

        logger.info("findUserByNickname 호출");

        User loginUser = userRepository.findBySequence(loginSeq);
        List<UserResponse> userResponseList = new ArrayList<>();

        List<User> users = userRepository.findByNickname(nickname);

        for (User user: users) {
            UserResponse userResponse = new UserResponse();
            userResponse.setUserSeq(user.getSequence());
            userResponse.setNickname(user.getNickname());
            userResponse.setProfileImage(user.getProfileImage());
            userResponse.setIdentify(user.getIdentify());

            UserBlock block1 = userBlockRepository.findByFromUserAndToUserAndIsDeleted(user, loginUser, false);
            if(null != block1) {
                logger.info(user.getSequence() + "로부터 차단된 상태");
                continue;
            }
            UserBlock block2 = userBlockRepository.findByFromUserAndToUserAndIsDeleted(loginUser, user, false);
            if (null != block2) {
                logger.info(user.getSequence() + "를 차단한 상태");
                userResponse.setRelation("차단함");
                userResponseList.add(userResponse);
            } else {
                Friend friend1 = friendRepository.findByFromUserAndToUser(user, loginUser);
                Friend friend2 = friendRepository.findByFromUserAndToUser(loginUser, user);
                if (null != friend1 && !friend1.getIsDeleted() && !friend1.getIsCanceled()) {
                    if(!friend1.getIsAccepted()) {
                        logger.info(user.getSequence() + "에게 요청 받음");
                        userResponse.setRelation("요청 받음");
                        userResponseList.add(userResponse);
                    } else {
                        logger.info(user.getSequence() + "와 친구");
                        userResponse.setRelation("친구");
                        userResponseList.add(userResponse);
                    }
                } else if (null != friend2 && !friend2.getIsDeleted() && !friend2.getIsCanceled()) {
                    if (!friend2.getIsAccepted()) {
                        logger.info(user.getSequence() + "의 수락 대기 중");
                        userResponse.setRelation("요청 함");
                        userResponseList.add(userResponse);
                    } else {
                        logger.info(user.getSequence() + "와 친구");
                        userResponse.setRelation("친구");
                        userResponseList.add(userResponse);
                    }
                } else {
                    logger.info("관계 없음");
                    userResponse.setRelation("관계 없음");
                    userResponseList.add(userResponse);
                }
            }
        }
        return UserListResponse.builder()
                .users(userResponseList)
                .build();
    }

    @Override
    public UserResponse findUserByIdentify(Long loginSeq, String identify) {

        logger.info("findUserByIdentify 호출");

        User loginUser = userRepository.findBySequence(loginSeq);
        UserResponse userResponse = new UserResponse();
        User targetUser = userRepository.findByIdentify(identify);
        if(null == targetUser) {
            logger.severe("없는 사용자");
            throw new RuntimeException();
        }

        UserBlock block1 = userBlockRepository.findByFromUserAndToUserAndIsDeleted(targetUser, loginUser, false);
        if(null != block1) {
            logger.info(targetUser.getSequence() + "로부터 차단된 상태");
            throw new RuntimeException();
        }
        userResponse.setUserSeq(targetUser.getSequence());
        userResponse.setNickname(targetUser.getNickname());
        userResponse.setProfileImage(targetUser.getProfileImage());
        userResponse.setIdentify(targetUser.getIdentify());
        UserBlock block2 = userBlockRepository.findByFromUserAndToUserAndIsDeleted(loginUser, targetUser, false);
        if (null != block2) {
            logger.info(targetUser.getSequence() + "를 차단한 상태");
            userResponse.setRelation("차단함");
        } else {
            Friend friend1 = friendRepository.findByFromUserAndToUser(targetUser, loginUser);
            Friend friend2 = friendRepository.findByFromUserAndToUser(loginUser, targetUser);
            if (null != friend1 && !friend1.getIsDeleted() && !friend1.getIsCanceled()) {
                if(!friend1.getIsAccepted()) {
                    logger.info(targetUser.getSequence() + "에게 요청 받음");
                    userResponse.setRelation("요청 받음");
                } else {
                    logger.info(targetUser.getSequence() + "와 친구");
                    userResponse.setRelation("친구");
                }
            } else if (null != friend2 && !friend2.getIsDeleted() && !friend2.getIsCanceled()) {
                if (!friend2.getIsAccepted()) {
                    logger.info(targetUser.getSequence() + "의 수락 대기 중");
                    userResponse.setRelation("요청 함");
                } else {
                    logger.info(targetUser.getSequence() + "와 친구");
                    userResponse.setRelation("친구");
                }
            } else {
                logger.info("관계 없음");
                userResponse.setRelation("관계 없음");
            }
        }
        return userResponse;
    }

    @Override
    @Transactional
    public String saveFriend(Long loginSeq, Long userSeq) {

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
            friendRepository.delete(friend2);
            Friend friend = Friend.builder()
                    .fromUser(loginUser)
                    .toUser(targetUser)
                    .isAccepted(false)
                    .isCanceled(false)
                    .isDeleted(false)
                    .build();
            friend.setCreatedAt(LocalDateTime.now());
            friendRepository.save(friend);
        } else {
            logger.severe("친구 요청 후 수락 대기 상태 혹은 친구 상태");
            throw new RuntimeException();
        }
        return "";
    }

    @Override
    @Transactional
    public String modifyFriendToCancel(Long loginSeq, Long userSeq) {

        logger.info("cancelFriendRequest 호출");

        Friend friend = friendRepository.findByFromUserAndToUser1(loginSeq, userSeq);
        if(null == friend) {
            logger.severe("취소할 수 있는 대상이 아님");
            throw new RuntimeException();
        }
        friend.setIsCanceled(true);
        return "";
    }

    @Override
    @Transactional
    public String modifyFriendToAccept(Long loginSeq, Long userSeq) {

        logger.info("modifyFriendToAccept 호출");

        Friend friend = friendRepository.findByFromUserAndToUser1(userSeq, loginSeq);
        if(null == friend) {
            logger.severe("수락할 수 있는 대상이 아님");
            throw new RuntimeException();
        }
        friend.setIsAccepted(true);
        return "";
    }

}
