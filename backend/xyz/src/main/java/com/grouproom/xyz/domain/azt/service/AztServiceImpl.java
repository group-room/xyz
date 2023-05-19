package com.grouproom.xyz.domain.azt.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.grouproom.xyz.domain.azt.dto.request.*;
import com.grouproom.xyz.domain.azt.dto.response.AztListResponse;
import com.grouproom.xyz.domain.azt.dto.response.AztResponse;
import com.grouproom.xyz.domain.azt.dto.response.MemberListResponse;
import com.grouproom.xyz.domain.azt.dto.response.MemberResponse;
import com.grouproom.xyz.domain.azt.entity.Azt;
import com.grouproom.xyz.domain.azt.entity.AztMember;
import com.grouproom.xyz.domain.azt.repository.AztMemberRepository;
import com.grouproom.xyz.domain.azt.repository.AztRepository;
import com.grouproom.xyz.domain.chat.repository.ChatRepository;
import com.grouproom.xyz.domain.friend.dto.response.FriendListResponse;
import com.grouproom.xyz.domain.friend.dto.response.FriendUserResponse;
import com.grouproom.xyz.domain.friend.service.FriendManageService;
import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.domain.user.repository.UserRepository;
import com.grouproom.xyz.global.exception.ErrorResponse;
import com.grouproom.xyz.global.service.S3UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.sql.Types;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.logging.Logger;

@RequiredArgsConstructor
@Service
public class AztServiceImpl implements AztService {

    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.azt.service.AztServiceImpl");
    private final AztRepository aztRepository;
    private final AztMemberRepository aztMemberRepository;
    private final UserRepository userRepository;
    private final ChatRepository chatRepository;
    private final FriendManageService friendManageService;
    private final S3UploadService s3UploadService;
    private final JdbcTemplate jdbcTemplate;

    @Override
    public AztListResponse findAztList(Long loginSeq) {

        logger.info("findAztList 호출");

        List<AztResponse> aztResponses = aztRepository.selectAzt(loginSeq, false);
        return AztListResponse.builder()
                .azts(aztResponses)
                .build();
    }

    @Override
    public AztResponse findAzt(Long loginSeq, Long aztSeq) {

        logger.info("findAzt 호출");

        AztMember loginMember = aztMemberRepository.findByAzt_SequenceAndUser_SequenceAndIsDeleted(aztSeq, loginSeq, false);
        if(null == loginMember) {
            logger.severe("아지트 멤버가 아님");
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "아지트 멤버가 아님");
        }
        List<MemberResponse> memberResponses = new ArrayList<>();
        List<AztMember> aztMembers = aztMemberRepository.findByAzt_SequenceAndIsDeleted(aztSeq, false);
        logger.info("멤버 수 : " + aztMembers.size());
        for (AztMember aztMember:aztMembers) {
            User user = aztMember.getUser();
            memberResponses.add(MemberResponse.builder()
                    .userSeq(user.getSequence())
                    .nickname(user.getNickname())
                    .identify(user.getIdentify())
                    .profileImage(user.getProfileImage())
                    .build());
        }
        logger.info("아지트 정보");
        Azt azt = aztRepository.findBySequenceAndIsDeleted(aztSeq, false);
        if(null == azt) {
            logger.severe("삭제된 아지트");
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "삭제된 아지트");
        }
        return AztResponse.builder()
                .aztSeq(azt.getSequence())
                .image(azt.getAztImage())
                .name(azt.getAztName())
                .createdAt(azt.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy년 MM월 dd일")))
                .updatedAt(azt.getUpdatedAt().format(DateTimeFormatter.ofPattern("yyyy년 MM월 dd일")))
                .chatSeq(azt.getChatSeq().getSequence())
                .members(memberResponses)
                .build();
    }

    @Override
    @Transactional
    public AztResponse addAzt(Long loginSeq, AddAztRequest addAztRequest, MultipartFile image) {

        logger.info("addAzt 호출");

        if(null == addAztRequest.getName()) {
            logger.severe("이름 미설정");
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "이름 미설정");
        }

        String imagePath;
        if(image.isEmpty()){
            logger.info("이미지 등록 안함");
            String number = String.format("%02d", new Random().nextInt(50) + 1);
            imagePath = new StringBuilder().append("https://ssafy-xyz.s3.ap-northeast-2.amazonaws.com/background/").append(number).append("_PixelSky_1920x1080.png").toString();
        } else {
            imagePath = s3UploadService.upload(image, "azt");
        }

        String membersJson = "[]"; // 기본값으로 빈 JSON 배열 설정
        if (null != addAztRequest.getMembers()) {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                membersJson = objectMapper.writeValueAsString(addAztRequest.getMembers());
                logger.info("membersJson : " + membersJson);
            } catch (JsonProcessingException e) {
                throw new ErrorResponse(HttpStatus.BAD_REQUEST, e.getMessage());
            }
        }

        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("usp_ins_azt")
                .declareParameters(
                        new SqlParameter("loginSeq", Types.BIGINT),
                        new SqlParameter("name", Types.VARCHAR),
                        new SqlParameter("imagePath", Types.VARCHAR),
                        new SqlParameter("members", Types.VARCHAR),
                        new SqlParameter("createdAt", Types.TIMESTAMP),
                        new SqlParameter("updatedAt", Types.TIMESTAMP),
                        new SqlOutParameter("outAztSeq", Types.BIGINT));

        MapSqlParameterSource paramMap = new MapSqlParameterSource()
                .addValue("loginSeq", loginSeq)
                .addValue("name", addAztRequest.getName())
                .addValue("imagePath", imagePath)
                .addValue("members", membersJson)
                .addValue("createdAt", LocalDateTime.now())
                .addValue("updatedAt", LocalDateTime.now())
                ;

        logger.info("프로시저 호출");
        Map<String, Object> result = jdbcCall.execute(paramMap);
        Long aztSeq = (Long) result.get("outAztSeq");
        logger.info("aztSeq: " + aztSeq);

        return findAzt(loginSeq, aztSeq);
    }

    @Override
    @Transactional
    public AztResponse modifyAzt(Long loginSeq, ModifyAztRequest modifyAztRequest, MultipartFile image) {

        logger.info("modifyAzt 호출");

        AztMember aztMember = aztMemberRepository.findByAzt_SequenceAndUser_Sequence(modifyAztRequest.getAztSeq(), loginSeq);
        if(null != aztMember) {
            logger.info("요청한 유저가 해당 아지트에 소속됨");
            Azt azt = aztMember.getAzt();
            if(azt.getIsDeleted()) {
                logger.severe("삭제된 아지트");
                throw new ErrorResponse(HttpStatus.BAD_REQUEST, "삭제된 아지트");
            } else {
                if (null == modifyAztRequest.getName()) {
                    logger.info("이름 없음");
                } else {
                    logger.info("이름 변경");
                    azt.setAztName(modifyAztRequest.getName());
                }
                if(image.isEmpty()) {
                    logger.info("사진 변경 안함");
                } else {
                    logger.info("사진 변경");
                    String imagePath = s3UploadService.upload(image, "azt");
                    azt.setAztImage(imagePath);
                }
            }
        } else {
            logger.severe("해당 아지트에 소속되지 않음");
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "해당 아지트에 소속되지 않음");
        }

        logger.info("아지트 상세 조회 호출");
        return findAzt(loginSeq, modifyAztRequest.getAztSeq());
    }

    @Override
    @Transactional
    public AztResponse addAztMember(Long loginSeq, AddAztMemberRequest addAztMemberRequest) {

        logger.info("addAztMember 호출");

        AztMember aztMember = aztMemberRepository.findByAzt_SequenceAndUser_Sequence(addAztMemberRequest.getAztSeq(), loginSeq);
        if(null != aztMember) {
            logger.info("요청한 유저가 해당 아지트에 소속됨");
            Azt azt = aztMember.getAzt();
            if(azt.getIsDeleted()) {
                logger.severe("삭제된 아지트");
                throw new ErrorResponse(HttpStatus.BAD_REQUEST, "삭제된 아지트");
            }
            for (MemberRequest member : addAztMemberRequest.getMembers()) {
                User user = userRepository.findBySequence(member.getUserSeq());
                aztMemberRepository.save(AztMember.builder()
                        .azt(azt)
                        .user(user)
                        .isDeleted(false)
                        .build());
                logger.info(user.getSequence() + " 멤버 가입");
            }
        } else {
            logger.severe("해당 아지트에 소속되지 않음");
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "해당 아지트에 소속되지 않음");
        }

        logger.info("아지트 상세 조회 호출");
        return findAzt(loginSeq, addAztMemberRequest.getAztSeq());
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
                        .chatSeq(friend.getChatSeq())
                        .build());
            }
        }
        return MemberListResponse.builder()
                .members(memberResponses)
                .build();
    }

    @Override
    @Transactional
    public AztListResponse modifyAztMemberToDelete(Long loginSeq, Long aztSeq) {

        logger.info("modifyAztMemberToDelete 호출");

        boolean withdraw = false;
        List<AztMember> aztMembers = aztMemberRepository.findByAzt_SequenceAndIsDeleted(aztSeq, false);
        for (AztMember aztMember: aztMembers) {
            if(aztMember.getUser().getSequence().equals(loginSeq)){
                aztMember.setIsDeleted(true);
                withdraw = true;
                logger.info("탈퇴 성공");
                break;
            }
        }

        if(withdraw) {
            if(aztMembers.size() == 1) {
                aztMembers.get(0).getAzt().setIsDeleted(true);
                logger.info("그룹 삭제");
            }
        } else {
            logger.severe("해당 아지트에 소속되지 않음");
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "해당 아지트에 소속되지 않음");
        }

        return findAztList(loginSeq);
    }

}
