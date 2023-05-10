package com.grouproom.xyz.domain.friend.service;

import com.grouproom.xyz.domain.friend.dto.response.FriendListResponse;
import com.grouproom.xyz.domain.friend.dto.response.FriendUserResponse;
import com.grouproom.xyz.domain.friend.entity.Friend;
import com.grouproom.xyz.domain.friend.repository.FriendRepository;
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
        if(null == friend) {
            logger.severe("친구 아님");
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "친구 아님");
        } else {
            friend.setIsDeleted(true);
        }
        return "";
    }

    @Override
    public FriendListResponse findFriendByNickname(Long loginSeq, String nickname) {

        logger.info("findFriendByNickname 호출");

        List<FriendUserResponse> friendUserResponseList = friendRepository.findNicknameByFromUserOrToUser(loginSeq, nickname, true,false,false);
        return FriendListResponse.builder()
                .friends(friendUserResponseList)
                .build();
    }

    @Override
    public FriendUserResponse findFriendByIdentify(Long loginSeq, String identify) {

        logger.info("findFriendByIdentify 호출");

        identify = new StringBuilder().append("#").append(identify).toString();

        FriendUserResponse friendUserResponse = friendRepository.findIdentifyBYFromUserOrToUser(loginSeq, identify, true, false, false);
        if(null == friendUserResponse) {
            logger.severe("친구 아님");
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "친구 아님");
        }
        return friendUserResponse;
    }
}
