package com.grouproom.xyz.domain.azt.service;

import com.grouproom.xyz.domain.azt.dto.request.AztRequest;
import com.grouproom.xyz.domain.azt.dto.request.MemberRequest;
import com.grouproom.xyz.domain.azt.dto.response.MemberListResponse;
import com.grouproom.xyz.domain.azt.dto.response.MemberResponse;
import com.grouproom.xyz.domain.azt.entity.Azt;
import com.grouproom.xyz.domain.azt.entity.AztMember;
import com.grouproom.xyz.domain.azt.repository.AztMemberRepository;
import com.grouproom.xyz.domain.azt.repository.AztRepository;
import com.grouproom.xyz.domain.friend.dto.response.FriendListResponse;
import com.grouproom.xyz.domain.friend.dto.response.FriendUserResponse;
import com.grouproom.xyz.domain.friend.service.FriendManageService;
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
public class AztServiceImpl implements AztService {

    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.azt.service.AztServiceImpl");
    private final AztRepository aztRepository;
    private final AztMemberRepository aztMemberRepository;
    private final UserRepository userRepository;
    private final FriendManageService friendManageService;

    @Override
    @Transactional
    public String addAzt(Long loginSeq, AztRequest aztRequest) {

        logger.info("addAzt 호출");

        Azt azt = aztRepository.save(Azt.builder()
                        .aztName(aztRequest.getName())
                        .aztImage(aztRequest.getImage())
                        .isDeleted(false)
                .build());
        logger.info("아지트 생성");

        User loginUser = userRepository.findBySequence(loginSeq);
        aztMemberRepository.save(AztMember.builder()
                .azt(azt)
                .user(loginUser)
                .isDeleted(false)
                .build());
        logger.info("본인 가입");

        for (MemberRequest member : aztRequest.getMembers()) {
            User user = userRepository.findBySequence(member.getUserSeq());
            aztMemberRepository.save(AztMember.builder()
                            .azt(azt)
                            .user(user)
                            .isDeleted(false)
                    .build());
            logger.info(user.getSequence() + " 멤버 가입");
        }
        return "";
    }

    @Override
    @Transactional
    public String modifyAzt(Long loginSeq, AztRequest aztRequest) {

        logger.info("modifyAzt 호출");

        AztMember aztMember = aztMemberRepository.findByAzt_SequenceAndUser_Sequence(aztRequest.getAztSeq(), loginSeq);
        if(null != aztMember) {
            logger.info("요청한 유저가 해당 아지트에 소속됨");
            Azt azt = aztRepository.findBySequence(aztRequest.getAztSeq());
            azt.setAztName(aztRequest.getName());
            azt.setAztImage(aztRequest.getImage());
        } else {
            logger.severe("소속된 아지트가 아님");
            throw new RuntimeException();
        }

        // 추후 상세 조회 호출

        return null;
    }

    @Override
    public String addAztMember(Long loginSeq, AztRequest aztRequest) {

        logger.info("addAztMember 호출");

        AztMember aztMember = aztMemberRepository.findByAzt_SequenceAndUser_Sequence(aztRequest.getAztSeq(), loginSeq);
        if(null != aztMember) {
            logger.info("요청한 유저가 해당 아지트에 소속됨");
            Azt azt = aztRepository.findBySequence(aztRequest.getAztSeq());
            for (MemberRequest member : aztRequest.getMembers()) {
                User user = userRepository.findBySequence(member.getUserSeq());
                aztMemberRepository.save(AztMember.builder()
                        .azt(azt)
                        .user(user)
                        .isDeleted(false)
                        .build());
                logger.info(user.getSequence() + " 멤버 가입");
            }
        } else {
            logger.severe("소속된 아지트가 아님");
            throw new RuntimeException();
        }

        return "";
    }

    @Override
    public MemberListResponse findFriendForMembers(Long loginSeq, Long aztSeq) {

        logger.info("findFriendForMembers 호출");

        FriendListResponse friendList = friendManageService.findFriend(loginSeq);
        List<MemberResponse> memberResponses = new ArrayList<>();
        for (FriendUserResponse friend : friendList.getFriends()) {
            AztMember aztMember = aztMemberRepository.findByAzt_SequenceAndUser_SequenceAndIsDeleted(aztSeq, friend.getUserSeq(), false);
            if(null != aztMember) {
                logger.info("아지트 멤버");
            } else {
                logger.info(friend.getUserSeq() + " 초대 가능");
                memberResponses.add(MemberResponse.builder()
                                .userSeq(friend.getUserSeq())
                                .profileImage(friend.getProfileImage())
                                .identify(friend.getIdentify())
                                .nickname(friend.getNickname())
                        .build());
            }
        }
        return MemberListResponse.builder()
                .members(memberResponses)
                .build();
    }

}
