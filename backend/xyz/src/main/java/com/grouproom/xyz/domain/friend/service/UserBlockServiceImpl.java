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
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class UserBlockServiceImpl implements UserBlockService {

    private final UserRepository userRepository;
    private final UserBlockRepository userBlockRepository;
    private final FriendRepository friendRepository;
    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.friend.service.UserBlockServiceImpl");

    @Override
    @Transactional
    public String saveUserBlock(Long loginSeq, Long userSeq) {

        logger.info("saveUserBlock 호출");

        Friend friend = friendRepository.findByFromUserAndToUser(loginSeq, userSeq, true, false, false);
        if(null != friend) {
            logger.info("친구 끊기");
            friend.setIsDeleted(true);
        }

        User loginUser = userRepository.findBySequence(loginSeq);
        User targetUser = userRepository.findBySequence(userSeq);
        if(null == targetUser) {
            logger.severe("없는 사용자");
        }
        userBlockRepository.save(UserBlock.builder()
                        .fromUser(loginUser)
                        .toUser(targetUser)
                        .isDeleted(false)
                    .build());

        logger.info("차단");

        return "";
    }
}
