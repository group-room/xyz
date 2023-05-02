package com.grouproom.xyz.domain.timecapsule.service;

import com.grouproom.xyz.domain.azt.entity.Azt;
import com.grouproom.xyz.domain.azt.repository.AztMemberRepository;
import com.grouproom.xyz.domain.azt.repository.AztRepository;
import com.grouproom.xyz.domain.timecapsule.dto.reqeust.AddTimecapsuleRequest;
import com.grouproom.xyz.domain.timecapsule.dto.response.AddTimecapsuleResponse;
import com.grouproom.xyz.domain.timecapsule.entity.Timecapsule;
import com.grouproom.xyz.domain.timecapsule.entity.TimecapsuleContent;
import com.grouproom.xyz.domain.timecapsule.entity.TimecapsuleContentFile;
import com.grouproom.xyz.domain.timecapsule.repository.TimecapsuleContentFileRepository;
import com.grouproom.xyz.domain.timecapsule.repository.TimecapsuleContentRepository;
import com.grouproom.xyz.domain.timecapsule.repository.TimecapsuleRepository;
import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.domain.user.repository.UserRepository;
import com.grouproom.xyz.global.exception.ErrorResponse;
import com.grouproom.xyz.global.model.FileType;
import com.grouproom.xyz.global.service.S3UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class TimecapsuleServiceImpl implements TimecapsuleService {

    private final AztRepository aztRepository;
    private final UserRepository userRepository;
    private final S3UploadService s3UploadService;
    private final AztMemberRepository aztMemberRepository;
    private final TimecapsuleRepository timecapsuleRepository;
    private final TimecapsuleContentRepository timecapsuleContentRepository;
    private final TimecapsuleContentFileRepository timecapsuleContentFileRepository;
    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.timecapsule.service.TimecapsuleServiceImpl");

    @Override
    @Transactional
    public void saveTimecapsulecontentFiles(TimecapsuleContent timecapsuleContent, FileType fileType, List<String> filePaths) {
        logger.info("saveTimecapsulecontentFiles 호출");

        filePaths.stream().forEach(
                (filePath) -> {
                    timecapsuleContentFileRepository.save(TimecapsuleContentFile.builder()
                            .timecapsuleContent(timecapsuleContent)
                            .fileType(fileType)
                            .filePath(filePath)
                            .build());
                }
        );
    }

    @Override
    @Transactional
    public AddTimecapsuleResponse addTimecapsule(Long userSeq, AddTimecapsuleRequest addTimecapsuleRequest, List<MultipartFile> images, List<MultipartFile> audios) {
        logger.info("addTimecapsule 호출");

        User user = userRepository.findBySequence(userSeq);

        if (user == null) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "존재하지 않는 유저입니다.");
        }

        Azt azt = aztRepository.findBySequence(addTimecapsuleRequest.getAztSeq());

        if (azt == null) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "존재하지 않는 azt입니다.");
        }

        Timecapsule timecapsule = Timecapsule.builder()
                .user(user)
                .azt(azt)
                .addTimecapsuleRequest(addTimecapsuleRequest)
                .build();
        timecapsuleRepository.save(timecapsule);

        addTimecapsuleContent(userSeq, timecapsule.getSequence(), addTimecapsuleRequest.getContent(), images, audios);

        return AddTimecapsuleResponse.builder()
                .timecapsuleSeq(timecapsule.getSequence())
                .build();
    }

    @Override
    @Transactional
    public void addTimecapsuleContent(Long userSeq, Long timecapsuleSeq, String content, List<MultipartFile> images, List<MultipartFile> audios) {
        logger.info("addTimecapsuleContent 호출");

        User user = userRepository.findBySequence(userSeq);

        if (user == null) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "존재하지 않는 유저입니다.");
        }

        Timecapsule timecapsule = timecapsuleRepository.findBySequence(timecapsuleSeq);

        if (timecapsule == null) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "존재하지 않는 타임캡슐입니다.");
        } else if (aztMemberRepository.findByAzt_SequenceAndUser_SequenceAndIsDeleted(timecapsule.getAzt().getSequence(), userSeq, false) == null) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "접근권한이 없는 타임캡슐입니다.");
        } else if (!timecapsule.getIsUpdatable()) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "수정기간이 지난 타임캡슐입니다.");
        }

        TimecapsuleContent timecapsuleContent = TimecapsuleContent.builder()
                .content(content)
                .user(user)
                .timecapsule(timecapsule)
                .build();

        if (images != null) {
            List<String> imagePaths = s3UploadService.upload(images, "timecapsule");
            saveTimecapsulecontentFiles(timecapsuleContent, FileType.IMAGE, imagePaths);
        }

        if (audios != null) {
            List<String> audioPaths = s3UploadService.upload(audios, "memory");
            saveTimecapsulecontentFiles(timecapsuleContent, FileType.AUDIO, audioPaths);
        }
    }
}
