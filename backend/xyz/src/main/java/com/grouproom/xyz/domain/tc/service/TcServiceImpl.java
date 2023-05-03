package com.grouproom.xyz.domain.tc.service;

import com.grouproom.xyz.domain.azt.entity.Azt;
import com.grouproom.xyz.domain.azt.repository.AztMemberRepository;
import com.grouproom.xyz.domain.azt.repository.AztRepository;
import com.grouproom.xyz.domain.tc.dto.reqeust.AddTcRequest;
import com.grouproom.xyz.domain.tc.dto.response.*;
import com.grouproom.xyz.domain.tc.entity.OpenStatus;
import com.grouproom.xyz.domain.tc.entity.Tc;
import com.grouproom.xyz.domain.tc.entity.TcContent;
import com.grouproom.xyz.domain.tc.entity.TcContentFile;
import com.grouproom.xyz.domain.tc.repository.TcContentFileRepository;
import com.grouproom.xyz.domain.tc.repository.TcContentRepository;
import com.grouproom.xyz.domain.tc.repository.TcRepository;
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

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class TcServiceImpl implements TcService {

    private final AztRepository aztRepository;
    private final UserRepository userRepository;
    private final S3UploadService s3UploadService;
    private final AztMemberRepository aztMemberRepository;
    private final TcRepository tcRepository;
    private final TcContentRepository tcContentRepository;
    private final TcContentFileRepository tcContentFileRepository;
    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.tc.service.TcServiceImpl");

    @Override
    @Transactional
    public void saveTccontentFiles(TcContent tcContent, FileType fileType, List<String> filePaths) {
        logger.info("saveTccontentFiles 호출");

        filePaths.stream().forEach(
                (filePath) -> {
                    tcContentFileRepository.save(TcContentFile.builder()
                            .tcContent(tcContent)
                            .fileType(fileType)
                            .filePath(filePath)
                            .build());
                }
        );
    }

    @Override
    @Transactional
    public AddTcResponse addTc(Long userSeq, AddTcRequest addTcRequest, List<MultipartFile> images, List<MultipartFile> audios) {
        logger.info("addTc 호출");

        User user = userRepository.findBySequence(userSeq);

        if (user == null) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "존재하지 않는 유저입니다.");
        }

        Azt azt = aztRepository.findBySequence(addTcRequest.getAztSeq());

        if (azt == null) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "존재하지 않는 azt입니다.");
        }

        Tc tc = Tc.builder()
                .user(user)
                .azt(azt)
                .addTcRequest(addTcRequest)
                .build();
        tcRepository.save(tc);

        addTcContent(userSeq, tc.getSequence(), addTcRequest.getContent(), images, audios);

        return AddTcResponse.builder()
                .tcSeq(tc.getSequence())
                .build();
    }

    @Override
    @Transactional
    public void addTcContent(Long userSeq, Long tcSeq, String content, List<MultipartFile> images, List<MultipartFile> audios) {
        logger.info("addTcContent 호출");

        User user = userRepository.findBySequence(userSeq);

        if (user == null) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "존재하지 않는 유저입니다.");
        }

        Tc tc = tcRepository.findBySequence(tcSeq);

        if (tc == null) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "존재하지 않는 타임캡슐입니다.");
        } else if (aztMemberRepository.findByAzt_SequenceAndUser_SequenceAndIsDeleted(tc.getAzt().getSequence(), userSeq, false) == null) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "접근권한이 없는 타임캡슐입니다.");
        } else if (tc.getOpenStatus() != OpenStatus.UPDATABLE) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "수정기간이 지난 타임캡슐입니다.");
        }

        TcContent tcContent = TcContent.builder()
                .content(content)
                .user(user)
                .tc(tc)
                .build();

        if (images != null) {
            List<String> imagePaths = s3UploadService.upload(images, "tc");
            saveTccontentFiles(tcContent, FileType.IMAGE, imagePaths);
        }

        if (audios != null) {
            List<String> audioPaths = s3UploadService.upload(audios, "memory");
            saveTccontentFiles(tcContent, FileType.AUDIO, audioPaths);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public OpenedTcDetailsResponse findOpenedTcDetails(Long userSeq, Long tcSeq) {
        logger.info("findOpenedTcDetails 호출");

        User user = userRepository.findBySequence(userSeq);

        if (user == null) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "존재하지 않는 유저입니다.");
        }

        Tc tc = tcRepository.findBySequence(tcSeq);

        if (tc == null) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "존재하지 않는 타임캡슐입니다.");
        } else if (aztMemberRepository.findByAzt_SequenceAndUser_SequenceAndIsDeleted(tc.getAzt().getSequence(), userSeq, false) == null) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "접근권한이 없는 타임캡슐입니다.");
        } else if (tc.getOpenStatus() != OpenStatus.OPENED) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "열리지 않은 타임캡슐입니다.");
        }

        OpenedTcInfoResponse openedTcInfoResponse = OpenedTcInfoResponse.builder()
                .tc(tc)
                .build();

        List<TcContent> tcContents = tcContentRepository.findByTc_Sequence(tc.getSequence());
        List<TcContentResponse> tcContentResponses = new ArrayList<>();

        for (TcContent tcContent : tcContents) {
            List<TcContentFile> tcContentFiles = tcContentFileRepository.findByTcContent_Sequence(tcContent.getSequence());
            List<TcContentFileResponse> tcContentFileResponses = new ArrayList<>();

            for (TcContentFile tcContentFile : tcContentFiles) {
                TcContentFileResponse tcContentFileResponse = TcContentFileResponse
                        .builder()
                        .tcContentFile(tcContentFile)
                        .build();
                tcContentFileResponses.add(tcContentFileResponse);
            }

            TcContentResponse tcContentResponse = TcContentResponse.builder()
                    .tcContent(tcContent)
                    .files(tcContentFileResponses)
                    .build();

            tcContentResponses.add(tcContentResponse);
        }

        return OpenedTcDetailsResponse.builder()
                .tc(openedTcInfoResponse)
                .contents(tcContentResponses)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public OpenedTcDetailsResponse findRandomOpenedTcDetails(Long userSeq) {
        logger.info("findOpenedTcDetails 호출");

        User user = userRepository.findBySequence(userSeq);

        return null;
    }

    @Override
    @Transactional(readOnly = true)
    public OpenedTcListResponse findOpenedTcList(Long userSeq) {
        logger.info("findOpenedTcList 호출");

        List<OpenedTcResponse> openedTcResponses = tcRepository.findOpenedTcListByUser_Seq(userSeq);
        return OpenedTcListResponse.builder()
                .openedTcResponses(openedTcResponses)
                .build();
    }
}
