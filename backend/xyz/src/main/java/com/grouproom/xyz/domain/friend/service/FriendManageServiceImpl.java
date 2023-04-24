package com.grouproom.xyz.domain.friend.service;

import com.grouproom.xyz.domain.friend.dto.response.FriendListResponse;
import com.grouproom.xyz.domain.friend.dto.response.FriendUserResponse;
import com.grouproom.xyz.domain.friend.entity.Friend;
import com.grouproom.xyz.domain.friend.repository.FriendRepository;
import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.domain.user.repository.UserRepository;
import com.grouproom.xyz.global.model.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
    public BaseResponse findFriend(Long loginUserSeq) {

        logger.info("findFriend 호출");

        User user = userRepository.findById(loginUserSeq).get();
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
        FriendListResponse friends = FriendListResponse.builder()
                .friends(friendUserResponseList)
                .build();

        BaseResponse friendListResponse = new BaseResponse(friends);

        return friendListResponse;
    }
}
