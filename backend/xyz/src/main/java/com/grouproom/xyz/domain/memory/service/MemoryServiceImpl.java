package com.grouproom.xyz.domain.memory.service;

import com.grouproom.xyz.domain.azt.entity.Azt;
import com.grouproom.xyz.domain.azt.repository.AztRepository;
import com.grouproom.xyz.domain.memory.dto.request.AddMemoryRequest;
import com.grouproom.xyz.domain.memory.dto.request.MemoryListRequest;
import com.grouproom.xyz.domain.memory.dto.response.*;
import com.grouproom.xyz.domain.memory.entity.Memory;
import com.grouproom.xyz.domain.memory.entity.MemoryComment;
import com.grouproom.xyz.domain.memory.entity.MemoryFile;
import com.grouproom.xyz.domain.memory.entity.MemoryLike;
import com.grouproom.xyz.domain.memory.repository.MemoryCommentRepository;
import com.grouproom.xyz.domain.memory.repository.MemoryFileRepository;
import com.grouproom.xyz.domain.memory.repository.MemoryLikeRepository;
import com.grouproom.xyz.domain.memory.repository.MemoryRepository;
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
public class MemoryServiceImpl implements MemoryService {

    private final UserRepository userRepository;
    private final S3UploadService s3UploadService;
    private final AztRepository aztRepository;
    private final MemoryRepository memoryRepository;
    private final MemoryFileRepository memoryFileRepository;
    private final MemoryLikeRepository memoryLikeRepository;
    private final MemoryCommentRepository memoryCommentRepository;
    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.memory.service.MemoryServiceImpl");

    @Override
    @Transactional
    public void saveMemoryFiles(Memory memory, FileType fileType, List<String> filePaths) {
        logger.info("saveMemoryFiles 호출");

        filePaths.stream().forEach(
                (filePath) -> {
                    memoryFileRepository.save(MemoryFile.builder()
                            .memory(memory)
                            .fileType(fileType)
                            .filePath(filePath)
                            .build());
                }
        );
    }

    @Override
    @Transactional(readOnly = true)
    public MemoryListResponse findMemory(Long userSeq, MemoryListRequest memoryListRequest) {
        logger.info("findMemory 호출");

        // TODO: 무한스크롤 구현 필요
        if (memoryListRequest.getLatitude() == null | memoryListRequest.getLongitude() == null) {
            logger.info("위치 정보 없음");

            List<MemoryResponse> memoryResponses = memoryRepository.findByUserSeq(userSeq, memoryListRequest.getAztSeq(), memoryListRequest.getDate());


            for (MemoryResponse memoryResponse : memoryResponses) {
                memoryResponse.setIsLiked(checkIsLiked(userSeq, memoryResponse.getMemorySeq()));
                memoryResponse.setLikeCnt(countMemoryLikes(memoryResponse.getMemorySeq()));
            }

            return MemoryListResponse.builder()
                    .memories(memoryResponses)
                    .build();
        }

        logger.info("위치 정보 있음");
        List<MemoryResponse> memoryResponses = memoryRepository.findByUserSeqAndCoordinate(userSeq, memoryListRequest.getAztSeq(), memoryListRequest.getLatitude(), memoryListRequest.getLongitude(), memoryListRequest.getDate());

        for (MemoryResponse memoryResponse : memoryResponses) {
            memoryResponse.setIsLiked(checkIsLiked(userSeq, memoryResponse.getMemorySeq()));
            memoryResponse.setLikeCnt(countMemoryLikes(memoryResponse.getMemorySeq()));
        }

        return MemoryListResponse.builder()
                .memories(memoryResponses)
                .build();
    }

    @Override
    @Transactional
    public AddMemoryResponse addMemory(Long userSeq, AddMemoryRequest addMemoryRequest, List<MultipartFile> images, List<MultipartFile> audios) {
        logger.info("addMemory 호출");

        User user = userRepository.findBySequence(userSeq);
        Azt azt = aztRepository.findBySequence(addMemoryRequest.getAztSeq());

        if (azt == null) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "존재하지 않는 azt입니다.");
        }

        Memory memory = Memory.builder()
                .user(user)
                .azt(azt)
                .addMemoryRequest(addMemoryRequest)
                .build();
        memoryRepository.save(memory);

        if (images != null) {
            List<String> imagePaths = s3UploadService.upload(images, "memory");
            saveMemoryFiles(memory, FileType.IMAGE, imagePaths);
        }

        if (audios != null) {
            List<String> audioPaths = s3UploadService.upload(audios, "memory");
            saveMemoryFiles(memory, FileType.AUDIO, audioPaths);
        }

        return AddMemoryResponse.builder()
                .memorySeq(memory.getSequence())
                .build();
    }

    @Override
    @Transactional
    public Boolean removeMemory(Long userSeq, Long memorySeq) {
        logger.info("removeMemory 호출");

        User user = userRepository.findBySequence(userSeq);
        Memory memory = memoryRepository.findBySequence(memorySeq);
        if (user.equals(memory.getUser())) {
            memory.updateIsDeleted(true);
            return true;
        }
        return false;
    }

    @Override
    @Transactional(readOnly = true)
    public MemoryListResponse findMyMemory(Long userSeq) {
        logger.info("findMyMemory 호출");

        List<Memory> memories = memoryRepository.findByUser_Sequence(userSeq);
        List<MemoryResponse> memoryResponses = new ArrayList<>();

        for (Memory memory : memories) {
            MemoryResponse memoryResponse = new MemoryResponse(
                    memory.getSequence(),
                    memory.getAzt().getSequence(),
                    memory.getAzt().getAztName(),
                    memory.getDate(),
                    memory.getLatitude(),
                    memory.getLongitude(),
                    memory.getLocation()
            );
            memoryResponses.add(memoryResponse);
        }

        for (MemoryResponse memoryResponse : memoryResponses) {
            memoryResponse.setIsLiked(checkIsLiked(userSeq, memoryResponse.getMemorySeq()));
            memoryResponse.setLikeCnt(countMemoryLikes(memoryResponse.getMemorySeq()));
        }

        return MemoryListResponse.builder()
                .memories(memoryResponses)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public MemoryListResponse findLikedMemory(Long userSeq) {
        logger.info("findLikedMemory 호출");

        List<MemoryLike> memoryLikes = memoryLikeRepository.findLikedMemoriesByUserSeq(userSeq);
        List<MemoryResponse> memoryResponses = new ArrayList<>();

        for (MemoryLike memoryLike : memoryLikes) {
            Memory memory = memoryLike.getMemory();
            MemoryResponse memoryResponse = new MemoryResponse(
                    memory.getSequence(),
                    memory.getAzt().getSequence(),
                    memory.getAzt().getAztName(),
                    memory.getDate(),
                    memory.getLatitude(),
                    memory.getLongitude(),
                    memory.getLocation()
            );
            memoryResponses.add(memoryResponse);
        }

        for (MemoryResponse memoryResponse : memoryResponses) {
            memoryResponse.setIsLiked(checkIsLiked(userSeq, memoryResponse.getMemorySeq()));
            memoryResponse.setLikeCnt(countMemoryLikes(memoryResponse.getMemorySeq()));
        }

        return MemoryListResponse.builder()
                .memories(memoryResponses)
                .build();
    }

    @Override
    @Transactional
    public void addMemoryLike(Long userSeq, Long memorySeq) {
        logger.info("addMemoryLike 호출");

        Optional<MemoryLike> memoryLike = memoryLikeRepository.findByUser_SequenceAndMemory_Sequence(userSeq, memorySeq);

        if (memoryLike.isPresent()) {
            if (memoryLike.get().getIsSelected()) {
                throw new ErrorResponse(HttpStatus.BAD_REQUEST, "이미 좋아요한 추억입니다.");
            }

            memoryLike.get().updateIsSelected(true);
            return;
        }

        User user = userRepository.findBySequence(userSeq);
        Memory memory = memoryRepository.findBySequence(memorySeq);

        if (memory.getIsDeleted()) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "삭제된 추억입니다.");
        }

        memoryLikeRepository.save(MemoryLike.builder()
                .user(user)
                .memory(memory)
                .build());

        return;
    }

    @Override
    @Transactional
    public void removeMemoryLike(Long userSeq, Long memorySeq) {
        logger.info("removeMemorylike 호출");

        Optional<MemoryLike> memoryLike = memoryLikeRepository.findByUser_SequenceAndMemory_Sequence(userSeq, memorySeq);

        if (memoryLike.isPresent() & memoryLike.get().getIsSelected()) {
            memoryLike.get().updateIsSelected(false);
            return;
        }

        throw new ErrorResponse(HttpStatus.BAD_REQUEST, "이미 좋아요 하지 않은 상태입니다.");
    }

    @Override
    @Transactional(readOnly = true)
    public MemoryDetailResponse findMemoryDetail(Long userSeq, Long memorySeq) {
        logger.info("findMemoryDetail 호출");

        Memory memory = memoryRepository.findBySequence(memorySeq);

        if (memory.getIsDeleted()) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "삭제된 추억입니다.");
        }

        List<MemoryFile> memoryFiles = memoryFileRepository.findByMemory_Sequence(memorySeq);
        List<MemoryFileResponse> memoryFileResponses = new ArrayList<>();

        if (memoryFiles != null) {
            for (MemoryFile memoryFile : memoryFiles) {
                MemoryFileResponse memoryFileResponse = new MemoryFileResponse(memoryFile);
                memoryFileResponses.add(memoryFileResponse);
            }
        }

        List<MemoryComment> memoryComments = memoryCommentRepository.findByMemory_Sequence(memorySeq);
        List<CommentResponse> commentResponses = new ArrayList<>();

        for (MemoryComment memoryComment : memoryComments) {
            CommentResponse commentResponse = new CommentResponse(memoryComment);
            commentResponses.add(commentResponse);
        }

        MemoryInfoResponse memoryInfoResponse = MemoryInfoResponse.builder()
                .memory(memory)
                .files(memoryFileResponses)
                .build();

        memoryInfoResponse.setIsLiked(checkIsLiked(userSeq, memorySeq));
        memoryInfoResponse.setLikeCnt(countMemoryLikes(memorySeq));

        return MemoryDetailResponse.builder()
                .comments(commentResponses)
                .memory(memoryInfoResponse)
                .build();
    }

    @Override
    @Transactional
    public void addMemoryComment(Long userSeq, Long memorySeq, String content) {
        logger.info("addMemoryComment 호출");

        User user = userRepository.findBySequence(userSeq);
        Memory memory = memoryRepository.findBySequence(memorySeq);

        if (memory.getIsDeleted()) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "삭제된 추억입니다.");
        }

        MemoryComment memoryComment = MemoryComment
                .builder()
                .user(user)
                .memory(memory)
                .content(content)
                .build();

        memoryCommentRepository.save(memoryComment);

        return;
    }

    @Override
    public Boolean checkIsLiked(Long userSeq, Long memorySeq) {
        Optional<MemoryLike> memoryLike = memoryLikeRepository.findByUser_SequenceAndMemory_Sequence(userSeq, memorySeq);
        if (memoryLike.isPresent() && memoryLike.get().getIsSelected()) {
            return true;
        }
        return false;
    }

    @Override
    public Integer countMemoryLikes(Long memorySeq) {
        return memoryLikeRepository.findByMemory_Sequence(memorySeq).size();
    }
}
