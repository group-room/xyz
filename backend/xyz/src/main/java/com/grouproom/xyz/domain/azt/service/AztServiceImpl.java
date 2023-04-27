package com.grouproom.xyz.domain.azt.service;

import com.grouproom.xyz.domain.azt.dto.request.AztRequest;
import com.grouproom.xyz.domain.azt.dto.request.MemberRequest;
import com.grouproom.xyz.domain.azt.entity.Azt;
import com.grouproom.xyz.domain.azt.entity.AztMember;
import com.grouproom.xyz.domain.azt.repository.AztMemberRepository;
import com.grouproom.xyz.domain.azt.repository.AztRepository;
import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.logging.Logger;

@RequiredArgsConstructor
@Service
public class AztServiceImpl implements AztService {

    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.azt.service.AztServiceImpl");
    private final AztRepository aztRepository;
    private final AztMemberRepository aztMemberRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public String addAzt(Long loginSeq, AztRequest aztRequest) {

        logger.info("addAzt 호출");

        Azt azt = aztRepository.save(Azt.builder()
                        .aztName(aztRequest.getName())
                        .aztImage(aztRequest.getImage())
                        .isDeleated(false)
                .build());
        logger.info("아지트 생성");

        User loginUser = userRepository.findBySequence(loginSeq);
        aztMemberRepository.save(AztMember.builder()
                .azt(azt)
                .user(loginUser)
                .isDeleated(false)
                .build());
        logger.info("본인 가입");

        for (MemberRequest member : aztRequest.getMembers()) {
            User user = userRepository.findBySequence(member.getUserSeq());
            aztMemberRepository.save(AztMember.builder()
                            .azt(azt)
                            .user(user)
                            .isDeleated(false)
                    .build());
            logger.info("멤버 가입");
        }
        return "";
    }
}
