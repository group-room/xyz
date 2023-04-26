package com.grouproom.xyz.domain.friend.service;

import com.grouproom.xyz.domain.friend.dto.response.FriendListResponse;
import com.grouproom.xyz.domain.friend.dto.response.FriendUserResponse;
import com.grouproom.xyz.domain.friend.entity.Friend;
import com.grouproom.xyz.domain.friend.repository.FriendRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.logging.Logger;

@RequiredArgsConstructor
@Service
public class FriendManageServiceImpl implements FriendManageService {

    private final FriendRepository friendRepository;
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
    public String modifyFriendIsDeleted(Long loginSeq, Long userSeq) throws RuntimeException {

        logger.info("modifyFriendDelete 호출");

        Friend friend = friendRepository.findByFromUserAndToUser(loginSeq, userSeq, true, false, false);
        if(null == friend) {
            logger.severe("친구 아님");
            throw new RuntimeException();
        } else {
            friend.setIsDeleted(true);
        }
        return "";
    }

    @Override
    public FriendListResponse findFriendByNickname(Long loginSeq, String nickname) {

        logger.info("findFriendByNickname 호출");

        List<FriendUserResponse> friendUserResponseList = friendRepository.findNicknameOfFromUserOrToUser(loginSeq, nickname, true,false,false);
        return FriendListResponse.builder()
                .friends(friendUserResponseList)
                .build();
    }

    @Override
    public FriendUserResponse findFriendByIdentify(Long loginSeq, String identify) {

        logger.info("findFriendByIdentify 호출");

        FriendUserResponse friendUserResponse = friendRepository.findIdentifyBYFromUserOrToUser(loginSeq, identify, true, false, false);
        if(null == friendUserResponse) {
            logger.severe("친구 아님");
            throw new RuntimeException();
        }
        return friendUserResponse;
    }
}
