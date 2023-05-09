package com.grouproom.xyz.domain.memory.service;

import com.grouproom.xyz.domain.azt.entity.Azt;
import com.grouproom.xyz.domain.azt.repository.AztRepository;
import com.grouproom.xyz.domain.memory.dto.request.AddMemoryRequest;
import com.grouproom.xyz.domain.memory.dto.request.MemoryListRequest;
import com.grouproom.xyz.domain.memory.dto.request.ModifyMemoryRequest;
import com.grouproom.xyz.domain.memory.dto.response.*;
import com.grouproom.xyz.domain.memory.entity.Memory;
import com.grouproom.xyz.domain.memory.entity.MemoryComment;
import com.grouproom.xyz.domain.memory.entity.MemoryFile;
import com.grouproom.xyz.domain.memory.entity.MemoryLike;
import com.grouproom.xyz.domain.memory.repository.MemoryCommentRepository;
import com.grouproom.xyz.domain.memory.repository.MemoryFileRepository;
import com.grouproom.xyz.domain.memory.repository.MemoryLikeRepository;
import com.grouproom.xyz.domain.memory.repository.MemoryRepository;
import com.grouproom.xyz.domain.notification.entity.NotificationType;
import com.grouproom.xyz.domain.notification.service.NotificationService;
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
    private final NotificationService notificationService;
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
                memoryResponse.setCommentCnt(memoryCommentRepository.findByMemory_SequenceAndIsDeleted(memoryResponse.getMemorySeq(), false).size());
                memoryResponse.setMemoryImage(findFilePath(memoryResponse.getMemorySeq()));
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
            memoryResponse.setCommentCnt(memoryCommentRepository.findByMemory_SequenceAndIsDeleted(memoryResponse.getMemorySeq(), false).size());
            memoryResponse.setMemoryImage(findFilePath(memoryResponse.getMemorySeq()));
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

        if (user == null) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "존재하지 않는 유저입니다.");
        }

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
    public void modifyMemory(Long userSeq, Long memorySeq, ModifyMemoryRequest modifyMemoryRequest, List<MultipartFile> images, List<MultipartFile> audios) {
        logger.info("modifyMemory 호출");

        User user = userRepository.findBySequence(userSeq);
        Memory memory = memoryRepository.findBySequence(memorySeq);

        if (memory.getUser() != user) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "수정 권한이 없는 추억앨범입니다.");
        }

        memory.updateMemory(modifyMemoryRequest);

        if (images != null) {
            logger.info("updateMemoryFile");

            List<MemoryFile> memoryFiles = memoryFileRepository.findByMemory_SequenceAndIsDeletedAndFileType(memorySeq, false, FileType.IMAGE);

            for (MemoryFile memoryFile : memoryFiles) {
                memoryFile.updateIsDeleted(true);
            }

            List<String> imagePaths = s3UploadService.upload(images, "memory");
            saveMemoryFiles(memory, FileType.IMAGE, imagePaths);
        }

        if (audios != null) {
            logger.info("updateMemoryFile");

            List<MemoryFile> memoryFiles = memoryFileRepository.findByMemory_SequenceAndIsDeletedAndFileType(memorySeq, false, FileType.AUDIO);

            for (MemoryFile memoryFile : memoryFiles) {
                memoryFile.updateIsDeleted(true);
            }
            List<String> audioPaths = s3UploadService.upload(audios, "memory");
            saveMemoryFiles(memory, FileType.AUDIO, audioPaths);
        }

        return;
    }

    @Override
    @Transactional
    public void removeMemory(Long userSeq, Long memorySeq) {
        logger.info("removeMemory 호출");

        User user = userRepository.findBySequence(userSeq);
        Memory memory = memoryRepository.findBySequence(memorySeq);

        if (memory == null) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "존재하지 않는 추억앨범입니다.");
        }

        if (memory.getUser() != user) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "삭제 권한이 없는 추억앨범입니다.");
        }

        memory.updateIsDeleted(true);

        return;
    }

    @Override
    @Transactional(readOnly = true)
    public MemoryListResponse findMyMemory(Long userSeq) {
        logger.info("findMyMemory 호출");

        List<Memory> memories = memoryRepository.findByUser_SequenceOrderByCreatedAtDesc(userSeq);
        List<MemoryResponse> memoryResponses = new ArrayList<>();

        for (Memory memory : memories) {
            MemoryResponse memoryResponse = new MemoryResponse(memory);
            memoryResponses.add(memoryResponse);
        }

        for (MemoryResponse memoryResponse : memoryResponses) {
            memoryResponse.setIsLiked(checkIsLiked(userSeq, memoryResponse.getMemorySeq()));
            memoryResponse.setLikeCnt(countMemoryLikes(memoryResponse.getMemorySeq()));
            memoryResponse.setCommentCnt(memoryCommentRepository.findByMemory_SequenceAndIsDeleted(memoryResponse.getMemorySeq(), false).size());
            memoryResponse.setMemoryImage(findFilePath(memoryResponse.getMemorySeq()));
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
            MemoryResponse memoryResponse = new MemoryResponse(memory);
            memoryResponses.add(memoryResponse);
        }

        for (MemoryResponse memoryResponse : memoryResponses) {
            memoryResponse.setIsLiked(checkIsLiked(userSeq, memoryResponse.getMemorySeq()));
            memoryResponse.setLikeCnt(countMemoryLikes(memoryResponse.getMemorySeq()));
            memoryResponse.setCommentCnt(memoryCommentRepository.findByMemory_SequenceAndIsDeleted(memoryResponse.getMemorySeq(), false).size());
            memoryResponse.setMemoryImage(findFilePath(memoryResponse.getMemorySeq()));
        }

        return MemoryListResponse.builder()
                .memories(memoryResponses)
                .build();
    }

    @Override
    @Transactional
    public void addMemoryLike(Long userSeq, Long memorySeq) {
        logger.info("addMemoryLike 호출");

        User user = userRepository.findBySequence(userSeq);
        Memory memory = memoryRepository.findBySequence(memorySeq);
        Optional<MemoryLike> memoryLike = memoryLikeRepository.findByUser_SequenceAndMemory_Sequence(userSeq, memorySeq);

        if (memoryLike.isPresent()) {
            if (memoryLike.get().getIsSelected()) {
                throw new ErrorResponse(HttpStatus.BAD_REQUEST, "이미 좋아요한 추억입니다.");
            }

            memoryLike.get().updateIsSelected(true);
            notificationService.addNotification(memory.getUser().getSequence(), memory.getSequence(), NotificationType.MEMORY, "NEW MEMORY LIKE", user.getNickname());

            return;
        }

        if (memory.getIsDeleted()) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "삭제된 추억입니다.");
        }

        memoryLikeRepository.save(MemoryLike.builder()
                .user(user)
                .memory(memory)
                .build());

        notificationService.addNotification(memory.getUser().getSequence(), memory.getSequence(), NotificationType.MEMORY, "NEW MEMORY LIKE", user.getNickname());

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

        List<MemoryFile> memoryFiles = memoryFileRepository.findByMemory_SequenceAndIsDeleted(memorySeq, false);
        List<MemoryFileResponse> memoryFileResponses = new ArrayList<>();

        if (memoryFiles != null) {
            for (MemoryFile memoryFile : memoryFiles) {
                MemoryFileResponse memoryFileResponse = new MemoryFileResponse(memoryFile);
                memoryFileResponses.add(memoryFileResponse);
            }
        }

        List<MemoryComment> memoryComments = memoryCommentRepository.findByMemory_SequenceAndIsDeleted(memorySeq, false);
        List<CommentResponse> commentResponses = new ArrayList<>();

        for (MemoryComment memoryComment : memoryComments) {
            CommentResponse commentResponse = new CommentResponse(memoryComment);
            commentResponses.add(commentResponse);
        }

        MemoryDetailResponse memoryDetailResponse = MemoryDetailResponse.builder()
                .memory(memory)
                .files(memoryFileResponses)
                .comments(commentResponses)
                .build();

        memoryDetailResponse.setIsLiked(checkIsLiked(userSeq, memorySeq));
        memoryDetailResponse.setLikeCnt(countMemoryLikes(memorySeq));
        memoryDetailResponse.setCommentCnt(memoryCommentRepository.findByMemory_SequenceAndIsDeleted(memorySeq, false).size());

        return memoryDetailResponse;
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

        notificationService.addNotification(memory.getUser().getSequence(), memory.getSequence(), NotificationType.MEMORY, "NEW MEMORY COMMENT", user.getNickname());

        return;
    }

    @Override
    @Transactional(readOnly = true)
    public Boolean checkIsLiked(Long userSeq, Long memorySeq) {
        Optional<MemoryLike> memoryLike = memoryLikeRepository.findByUser_SequenceAndMemory_Sequence(userSeq, memorySeq);
        if (memoryLike.isPresent() && memoryLike.get().getIsSelected()) {
            return true;
        }
        return false;
    }

    @Override
    @Transactional(readOnly = true)
    public Integer countMemoryLikes(Long memorySeq) {
        return memoryLikeRepository.findByMemory_SequenceAndIsSelected(memorySeq, true).size();
    }

    @Override
    @Transactional(readOnly = true)
    public String findFilePath(Long memorySeq) {
        MemoryFile memoryFile = memoryFileRepository.findFirstByMemory_SequenceAndIsDeleted(memorySeq, false);

        if (memoryFile != null) {
            return memoryFile.getFilePath();
        }

        Memory memory = memoryRepository.findBySequence(memorySeq);

        return memory.getAzt().getAztImage();
    }

    @Override
    @Transactional
    public void modifyMemoryComment(Long userSeq, Long commentSeq, String content) {
        logger.info("modifyMemoryComment 호출");

        User user = userRepository.findBySequence(userSeq);
        MemoryComment comment = memoryCommentRepository.findBySequence(commentSeq);

        if (comment == null) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "존재하지 않는 댓글입니다.");
        }

        if (comment.getUser() != user) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "수정 권한이 없는 댓글입니다.");
        }

        if (comment.getIsDeleted()) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "삭제된 댓글입니다.");
        }

        comment.updateContent(content);

        return;
    }

    @Override
    @Transactional
    public void removeMemoryComment(Long userSeq, Long commentSeq) {
        logger.info("removeMemoryComment 호출");

        User user = userRepository.findBySequence(userSeq);
        MemoryComment comment = memoryCommentRepository.findBySequence(commentSeq);

        if (comment == null) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "존재하지 않는 댓글입니다.");
        }

        if (comment.getUser() != user) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "삭제 권한이 없는 댓글입니다.");
        }

        comment.updateIsDeleted(true);

        return;
    }
}