package com.grouproom.xyz.domain.tc.service;

import com.grouproom.xyz.domain.azt.entity.Azt;
import com.grouproom.xyz.domain.azt.repository.AztMemberRepository;
import com.grouproom.xyz.domain.azt.repository.AztRepository;
import com.grouproom.xyz.domain.tc.dto.reqeust.AddTcOpenRequest;
import com.grouproom.xyz.domain.tc.dto.reqeust.AddTcRequest;
import com.grouproom.xyz.domain.tc.dto.response.*;
import com.grouproom.xyz.domain.tc.entity.*;
import com.grouproom.xyz.domain.tc.repository.TcContentFileRepository;
import com.grouproom.xyz.domain.tc.repository.TcContentRepository;
import com.grouproom.xyz.domain.tc.repository.TcOpenRepository;
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
import java.util.Optional;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class TcServiceImpl implements TcService {

    private final TcRepository tcRepository;
    private final AztRepository aztRepository;
    private final UserRepository userRepository;
    private final S3UploadService s3UploadService;
    private final TcOpenRepository tcOpenRepository;
    private final TcContentRepository tcContentRepository;
    private final AztMemberRepository aztMemberRepository;
    private final TcContentFileRepository tcContentFileRepository;
    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.tc.service.TcServiceImpl");

    @Override
    @Transactional
    public void saveTcContentFiles(TcContent tcContent, FileType fileType, List<String> filePaths) {
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

        if (addTcRequest.getOpenEnd() == null | addTcRequest.getUpdateEnd() == null | addTcRequest.getOpenStart() == null) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "타임캡슐 날짜를 지정해주세요.");
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
            saveTcContentFiles(tcContent, FileType.IMAGE, imagePaths);
        }

        if (audios != null) {
            List<String> audioPaths = s3UploadService.upload(audios, "memory");
            saveTcContentFiles(tcContent, FileType.AUDIO, audioPaths);
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
        Optional<Tc> randomTc = tcRepository.findRandomOpenedTcByUser_Seq(userSeq);

        if (randomTc.isEmpty()) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "확인할 수 있는 타임캡슐이 없습니다.");
        } else {
            OpenedTcInfoResponse openedTcInfoResponse = OpenedTcInfoResponse.builder()
                    .tc(randomTc.get())
                    .build();

            List<TcContent> tcContents = tcContentRepository.findByTc_Sequence(randomTc.get().getSequence());
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

    @Override
    @Transactional(readOnly = true)
    public TcListResponse findWaitingTcList(Long userSeq) {
        logger.info("findWaitingTcList 호출");

        List<TcResponse> tcResponses = tcRepository.findWaitingTcListByUser_Seq(userSeq);

        for (TcResponse tcResponse : tcResponses) {
            tcResponse.setRequiredCnt((long) Math.ceil((double) aztMemberRepository.countByAzt_SequenceAndIsDeleted(tcResponse.getAztSeq(), false) / 2.0));

            if (tcResponse.getOpenStatus().equals("OPENABLE")) {
                tcResponse.setOpenCnt(tcOpenRepository.countTcOpensByTc_Sequence(tcResponse.getTcSeq()));
            }
        }

        return TcListResponse.builder()
                .tcResponses(tcResponses)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public TcListResponse findTcList(Long aztSeq) {
        logger.info("findTcList 호출");

        if (aztSeq == null) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "아지트 seq가 필요합니다.");
        }

        Long requiredCnt = (long) Math.ceil((double) aztMemberRepository.countByAzt_SequenceAndIsDeleted(aztSeq, false) / 2.0);

        List<Tc> tcs = tcRepository.findAllByAzt_SequenceOrderByCreatedAtDesc(aztSeq);
        List<TcResponse> tcResponses = new ArrayList<>();

        for (Tc tc : tcs) {
            TcResponse tcResponse = TcResponse.builder()
                    .tc(tc)
                    .requiredCnt(requiredCnt)
                    .build();

            if (tcResponse.getOpenStatus().equals("OPENABLE")) {
                tcResponse.setOpenCnt(tcOpenRepository.countTcOpensByTc_Sequence(tcResponse.getTcSeq()));
            }

            tcResponses.add(tcResponse);
        }

        return TcListResponse.builder()
                .tcResponses(tcResponses)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public TcListResponse findMyTcList(Long userSeq) {
        logger.info("findMyTcList 호출");

        List<Tc> tcs = tcRepository.findTcListByUser_Seq(userSeq);
        List<TcResponse> tcResponses = new ArrayList<>();

        for (Tc tc : tcs) {
            TcResponse tcResponse = TcResponse.builder()
                    .tc(tc)
                    .requiredCnt((long) Math.ceil((double) aztMemberRepository.countByAzt_SequenceAndIsDeleted(tc.getAzt().getSequence(), false) / 2.0))
                    .build();

            if (tcResponse.getOpenStatus().equals("OPENABLE")) {
                tcResponse.setOpenCnt(tcOpenRepository.countTcOpensByTc_Sequence(tc.getSequence()));
            }

            tcResponses.add(tcResponse);
        }

        return TcListResponse.builder()
                .tcResponses(tcResponses)
                .build();
    }

    @Override
    public String addTcOpen(Long userSeq, Long tcSeq, AddTcOpenRequest addTcOpenRequest) {
        logger.info("addTcOpen 호출");

        Tc tc = tcRepository.findBySequence(tcSeq);

        if (tc == null) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "존재하지 않는 타임캡슐입니다.");
        } else if (aztMemberRepository.findByAzt_SequenceAndUser_SequenceAndIsDeleted(tc.getAzt().getSequence(), userSeq, false) == null) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "타임캡슐 오픈 권한이 없습니다.");
        } else if (tc.getOpenStatus() != OpenStatus.OPENABLE) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "타임캡슐 오픈 날짜를 확인해주세요.");
        }

        List<Tc> tcs = tcRepository.findOpenableTcByUser_SeqAndCoordinates(userSeq, addTcOpenRequest.getLatitude(), addTcOpenRequest.getLongitude());

        if (!tcs.contains(tc)) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "타임캡슐이 멀리 있습니다.");
        }

        User user = userRepository.findBySequence(userSeq);

        TcOpen tcOpen = new TcOpen(user, tc);
        tcOpenRepository.save(tcOpen);

        Long requiredCnt = (long) Math.ceil((double) aztMemberRepository.countByAzt_SequenceAndIsDeleted(tc.getAzt().getSequence(), false) / 2.0);

        if (tcOpenRepository.countTcOpensByTc_Sequence(tcSeq) >= requiredCnt) {
            tc.updateOpenStatus(OpenStatus.OPENED);
            tcRepository.save(tc);
        }

        return tc.getOpenStatus().toString();
    }
}
