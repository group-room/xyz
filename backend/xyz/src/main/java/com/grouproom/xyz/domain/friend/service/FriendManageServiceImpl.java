package com.grouproom.xyz.domain.friend.service;

import com.grouproom.xyz.domain.friend.dto.response.FriendListResponse;
import com.grouproom.xyz.domain.friend.dto.response.FriendUserResponse;
import com.grouproom.xyz.domain.friend.entity.Friend;
import com.grouproom.xyz.domain.friend.repository.FriendRepository;
import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@RequiredArgsConstructor
@Service
public class FriendManageServiceImpl implements FriendManageService {

    private final FriendRepository friendRepository;
    private final UserRepository userRepository;
    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.friend.service.FriendManageServiceImpl");

    @Override
    public FriendListResponse findFriend(Long loginUserSeq) {

        logger.info("findFriend 호출");

        User user = userRepository.findBySequence(loginUserSeq);
        List<FriendUserResponse> friendUserResponseList = new ArrayList<>();
        List<Friend> fromList = friendRepository.findByFromUserAndIsAcceptedAndIsDeleted(user, true, false);
        List<Friend> toList = friendRepository.findByToUserAndIsAcceptedAndIsDeleted(user, true, false);
        for (Friend friend : fromList) {
            User f = friend.getToUser();
            FriendUserResponse friendUserResponse = FriendUserResponse.builder()
                    .userSeq(f.getSequence())
                    .nickname(f.getNickname())
                    .profileImage(f.getProfileImage())
                    .identify(f.getIdentify())
                    .build();
            friendUserResponseList.add(friendUserResponse);
        }
        for (Friend friend : toList) {
            User f = friend.getFromUser();
            FriendUserResponse friendUserResponse = FriendUserResponse.builder()
                    .userSeq(f.getSequence())
                    .nickname(f.getNickname())
                    .profileImage(f.getProfileImage())
                    .identify(f.getIdentify())
                    .build();
            friendUserResponseList.add(friendUserResponse);
        }

        return FriendListResponse.builder()
                .friends(friendUserResponseList)
                .build();
    }

    @Override
    @Transactional
    public String modifyFriendIsDeleted(Long loginSeq, Long userSeq) throws RuntimeException {

        logger.info("modifyFriendDelete 호출");

        User loginUser = userRepository.findBySequence(loginSeq);
        User targetUser = userRepository.findBySequence(userSeq);
        if(null == targetUser){
            logger.severe("targetUser가 존재하지 않음");
            throw new RuntimeException();
        }
        Friend friend = friendRepository.findByFromUserAndToUserAndIsAcceptedAndIsDeleted(loginUser, targetUser, true, false);
        if(null == friend) {
            friend = friendRepository.findByFromUserAndToUserAndIsAcceptedAndIsDeleted(targetUser, loginUser, true, false);
        }
        if(null == friend) {
            logger.severe("친구 관계가 아님");
            throw new RuntimeException();
        } else {
            friend.setIsDeleted(true);
        }
        return "";
    }

    @Override
    public FriendListResponse findFriendByNickname(Long loginSeq, String nickname) {

        logger.info("findFriendByNickname 호출");

        User loginUser = userRepository.findBySequence(loginSeq);
        List<FriendUserResponse> friendUserResponseList = new ArrayList<>();

        List<User> users = userRepository.findByNickname(nickname);
        for (User user: users) {
            Friend friend = friendRepository.findByFromUserAndToUserAndIsAcceptedAndIsDeleted(loginUser, user, true, false);
            if (null != friend) {
                User target = friend.getToUser();
                FriendUserResponse friendUserResponse = FriendUserResponse.builder()
                        .userSeq(target.getSequence())
                        .nickname(target.getNickname())
                        .profileImage(target.getProfileImage())
                        .identify(target.getIdentify())
                        .build();
                friendUserResponseList.add(friendUserResponse);
            } else {
                friend = friendRepository.findByFromUserAndToUserAndIsAcceptedAndIsDeleted(user, loginUser, true, false);
                if (null != friend) {
                    User target = friend.getFromUser();
                    FriendUserResponse friendUserResponse = FriendUserResponse.builder()
                            .userSeq(target.getSequence())
                            .nickname(target.getNickname())
                            .profileImage(target.getProfileImage())
                            .identify(target.getIdentify())
                            .build();
                    friendUserResponseList.add(friendUserResponse);
                }
            }
        }
        return  FriendListResponse.builder()
                .friends(friendUserResponseList)
                .build();
    }

    @Override
    public FriendUserResponse findFriendByIdentify(Long loginSeq, String identify) throws RuntimeException {

        logger.info("findFriendByIdentify 호출");

        FriendUserResponse friendUserResponse;
        User loginUser = userRepository.findBySequence(loginSeq);
        User targetUser = userRepository.findByIdentify(identify);
        if(null == targetUser) {
            logger.severe("없는 사용자");
            throw new RuntimeException();
        }
        Friend friend = friendRepository.findByFromUserAndToUserAndIsAcceptedAndIsDeleted(loginUser, targetUser, true, false);
        if(null != friend) {
            User target = friend.getToUser();
            friendUserResponse = FriendUserResponse.builder()
                    .userSeq(target.getSequence())
                    .nickname(target.getNickname())
                    .profileImage(target.getProfileImage())
                    .identify(target.getIdentify())
                    .build();
        } else {
            friend = friendRepository.findByFromUserAndToUserAndIsAcceptedAndIsDeleted(targetUser, loginUser, true, false);
            if(null != friend) {
                User target = friend.getFromUser();
                friendUserResponse = FriendUserResponse.builder()
                        .userSeq(target.getSequence())
                        .nickname(target.getNickname())
                        .profileImage(target.getProfileImage())
                        .identify(target.getIdentify())
                        .build();
            } else {
                logger.severe("친구 아님");
                throw new RuntimeException();
            }
        }
        return friendUserResponse;
    }
}
