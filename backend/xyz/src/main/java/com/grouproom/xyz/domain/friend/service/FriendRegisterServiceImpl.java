package com.grouproom.xyz.domain.friend.service;

import com.grouproom.xyz.domain.friend.dto.response.UserListResponse;
import com.grouproom.xyz.domain.friend.dto.response.UserResponse;
import com.grouproom.xyz.domain.friend.entity.Friend;
import com.grouproom.xyz.domain.friend.entity.UserBlock;
import com.grouproom.xyz.domain.friend.repository.FriendRepository;
import com.grouproom.xyz.domain.friend.repository.UserBlockRepository;
import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.domain.user.repository.UserRepository;
import com.grouproom.xyz.global.exception.ErrorResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

        List<UserResponse> userResponseList = new ArrayList<>();
        List<User> users = userRepository.findByNickname(nickname);
        for (User user: users) {
            UserResponse userResponse = new UserResponse();
            userResponse.setUserSeq(user.getSequence());
            userResponse.setNickname(user.getNickname());
            userResponse.setProfileImage(user.getProfileImage());
            userResponse.setIdentify(user.getIdentify());

            List<UserBlock> blocks = userBlockRepository.findNicknameByFromUserOrToUser(loginSeq, user.getSequence(), false);
            if(blocks.size() != 0) {
                for (UserBlock block: blocks) {
                    if(block.getFromUser().equals(user)) {
                        logger.info(user.getSequence() + "로부터 차단된 상태");
                    } else {
                        logger.info(user.getSequence() + "를 차단한 상태");
                        userResponse.setRelation("차단함");
                    }
                }
                userResponseList.add(userResponse);
                continue;
            }
            Friend friend = friendRepository.findByFromUserOrToUser(loginSeq, user.getSequence());
            if(null == friend || friend.getIsDeleted() || friend.getIsCanceled()) {
                logger.info("관계 없음");
                userResponse.setRelation("관계 없음");
            } else if(friend.getIsAccepted()) {
                logger.info(user.getSequence() + "와 친구");
                userResponse.setRelation("친구");
            } else if(friend.getFromUser().equals(user)) {
                logger.info(user.getSequence() + "에게 요청 받음");
                userResponse.setRelation("요청 받음");
            } else {
                logger.info(user.getSequence() + "의 수락 대기 중");
                userResponse.setRelation("요청 함");
            }
            userResponseList.add(userResponse);
        }

        return UserListResponse.builder()
                .users(userResponseList)
                .build();
    }

    @Override
    public UserResponse findUserByIdentify(Long loginSeq, String identify) {

        logger.info("findUserByIdentify 호출");

        identify = new StringBuilder().append("#").append(identify).toString();

        User targetUser = userRepository.findByIdentify(identify);
        if(null == targetUser) {
            logger.severe("없는 사용자");
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "없는 사용자");
        }
        UserResponse userResponse = new UserResponse();
        userResponse.setUserSeq(targetUser.getSequence());
        userResponse.setNickname(targetUser.getNickname());
        userResponse.setProfileImage(targetUser.getProfileImage());
        userResponse.setIdentify(targetUser.getIdentify());

        List<UserBlock> blocks = userBlockRepository.findNicknameByFromUserOrToUser(loginSeq, targetUser.getSequence(), false);
        if(blocks.size() != 0) {
            for (UserBlock block: blocks) {
                if(block.getFromUser().equals(targetUser)) {
                    logger.info(targetUser.getSequence() + "로부터 차단된 상태");
                    throw new ErrorResponse(HttpStatus.BAD_REQUEST, targetUser.getSequence() + "로부터 차단된 상태");
                } else {
                    logger.info(targetUser.getSequence() + "를 차단한 상태");
                    userResponse.setRelation("차단함");
                }
            }
            return userResponse;
        }

        Friend friend = friendRepository.findByFromUserOrToUser(loginSeq, targetUser.getSequence());
        if(null == friend || friend.getIsDeleted() || friend.getIsCanceled()) {
            logger.info("관계 없음");
            userResponse.setRelation("관계 없음");
        } else if(friend.getIsAccepted()) {
            logger.info(targetUser.getSequence() + "와 친구");
            userResponse.setRelation("친구");
        } else if(friend.getFromUser().equals(targetUser)) {
            logger.info(targetUser.getSequence() + "에게 요청 받음");
            userResponse.setRelation("요청 받음");
        } else {
            logger.info(targetUser.getSequence() + "의 수락 대기 중");
            userResponse.setRelation("요청 함");
        }
        return userResponse;
    }

    @Override
    @Transactional
    public String saveFriend(Long loginSeq, Long userSeq) {

        logger.info("saveFriendRequest 호출");

        List<UserBlock> blocks = userBlockRepository.findNicknameByFromUserOrToUser(loginSeq, userSeq, false);
        if(blocks.size() != 0) {
            for (UserBlock block: blocks) {
                if(block.getFromUser().getSequence().equals(loginSeq)) {
                    logger.severe("차단힌 상태이므로 요청 불가");
                    throw new ErrorResponse(HttpStatus.BAD_REQUEST, "차단힌 상태이므로 요청 불가");
                } else {
                    logger.severe("차단 당함");
                    throw new ErrorResponse(HttpStatus.BAD_REQUEST, "차단 당함");
                }
            }
        }
        Friend friend = friendRepository.findByFromUserOrToUser(loginSeq, userSeq);
        if(null == friend) {
            logger.info("최초 요청");
            Friend newFriend = Friend.builder()
                    .fromUser(userRepository.findBySequence(loginSeq))
                    .toUser(userRepository.findBySequence(userSeq))
                    .isAccepted(false)
                    .isCanceled(false)
                    .isDeleted(false)
                    .build();
            friendRepository.save(newFriend);
        } else {
            if(friend.getIsCanceled() || friend.getIsDeleted()){
                if(friend.getFromUser().getSequence().equals(loginSeq) && friend.getToUser().getSequence().equals(userSeq)) {
                    logger.info("요청 취소 상태 또는 친구 삭제 상태 : 과거 신청 주체가 로그인 유저");
                    friend.setCreatedAt(LocalDateTime.now());
                    friend.setUpdatedAt(null);
                    friend.setIsAccepted(false);
                    friend.setIsCanceled(false);
                    friend.setIsDeleted(false);
                } else if (friend.getFromUser().getSequence().equals(userSeq) && friend.getToUser().getSequence().equals(loginSeq)) {
                    logger.info("요청 취소 상태 또는 친구 삭제 상태 : 과거 신청 주체가 타겟 유저");
                    Friend newFriend = Friend.builder()
                            .fromUser(friend.getToUser())
                            .toUser(friend.getFromUser())
                            .isAccepted(false)
                            .isCanceled(false)
                            .isDeleted(false)
                            .build();
                    friendRepository.save(newFriend);
                    friendRepository.delete(friend);
                }
            } else {
                logger.severe("친구 요청 후 수락 대기 상태 혹은 친구 상태");
                throw new ErrorResponse(HttpStatus.BAD_REQUEST, "친구 요청 후 수락 대기 상태 혹은 친구 상태");
            }
        }
        return "";
    }

    @Override
    @Transactional
    public String modifyFriendToCancel(Long loginSeq, Long userSeq) {

        logger.info("cancelFriendRequest 호출");

        Friend friend = friendRepository.findByFromUser_SequenceAndToUser_SequenceAndIsAcceptedAndIsCanceledAndIsDeleted(loginSeq, userSeq, false, false, false);
        if(null == friend) {
            logger.severe("취소할 수 있는 대상이 아님");
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "취소할 수 있는 대상이 아님");
        }
        friend.setIsCanceled(true);
        return "";
    }

    @Override
    @Transactional
    public String modifyFriendToAccept(Long loginSeq, Long userSeq) {

        logger.info("modifyFriendToAccept 호출");

        Friend friend = friendRepository.findByFromUser_SequenceAndToUser_SequenceAndIsAcceptedAndIsCanceledAndIsDeleted(userSeq, loginSeq, false, false, false);
        if(null == friend) {
            logger.severe("수락할 수 있는 대상이 아님");
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "수락할 수 있는 대상이 아님");
        }
        friend.setIsAccepted(true);
        return "";
    }

}
