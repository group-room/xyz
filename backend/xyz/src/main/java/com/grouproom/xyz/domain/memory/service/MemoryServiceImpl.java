package com.grouproom.xyz.domain.memory.service;

import com.grouproom.xyz.domain.memory.dto.request.AddMemoryRequest;
import com.grouproom.xyz.domain.memory.dto.request.MemoryListRequest;
import com.grouproom.xyz.domain.memory.dto.response.AddMemoryResponse;
import com.grouproom.xyz.domain.memory.dto.response.MemoryListResponse;
import com.grouproom.xyz.domain.memory.dto.response.MemoryResponse;
import com.grouproom.xyz.domain.memory.entity.Memory;
import com.grouproom.xyz.domain.memory.entity.MemoryFile;
import com.grouproom.xyz.domain.memory.entity.MemoryLike;
import com.grouproom.xyz.domain.memory.repository.MemoryFileRepository;
import com.grouproom.xyz.domain.memory.repository.MemoryLikeRepository;
import com.grouproom.xyz.domain.memory.repository.MemoryRepository;
import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.domain.user.repository.UserRepository;
import com.grouproom.xyz.global.model.FileType;
import com.grouproom.xyz.global.service.S3UploadService;
import lombok.RequiredArgsConstructor;
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
    //    private final AztRepository aztRepository;
    private final MemoryRepository memoryRepository;
    private final MemoryFileRepository memoryFileRepository;
    private final MemoryLikeRepository memoryLikeRepository;
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
        if (memoryListRequest.getIsLocationBased() == false) {
            logger.info("isLocationBased == false");
            List<MemoryResponse> memoryResponses = memoryRepository.findByUserSeq(userSeq, memoryListRequest.getAztSeq(), memoryListRequest.getDate());
            return MemoryListResponse.builder()
                    .memories(memoryResponses)
                    .build();
        }

        logger.info("isLocationBased == true");
        List<MemoryResponse> memoryResponses = memoryRepository.findByUserSeqAndCoordinate(userSeq, memoryListRequest.getAztSeq(), memoryListRequest.getLatitude(), memoryListRequest.getLongitude(), memoryListRequest.getDate());
        return MemoryListResponse.builder()
                .memories(memoryResponses)
                .build();
    }

    @Override
    @Transactional
    public AddMemoryResponse addMemory(Long userSeq, AddMemoryRequest addMemoryRequest) {
        logger.info("addMemory 호출");

        // TODO: Azt repository 생기면 수정
        User user = userRepository.findBySequence(userSeq);
//        Azt azt = aztRepository.findBySequence(addMemoryRequest.getAztSeq());
        Memory memory = Memory.builder()
                .user(user)
                .addMemoryRequest(addMemoryRequest)
                .build();
        memoryRepository.save(memory);

        List<MultipartFile> images = addMemoryRequest.getImages();
        if (images != null) {
            List<String> imagePaths = s3UploadService.upload(images, "memory");
            saveMemoryFiles(memory, FileType.IMAGE, imagePaths);
        }

        List<MultipartFile> audios = addMemoryRequest.getAudios();
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

        logger.info(memoryResponses.toString());

        return MemoryListResponse.builder()
                .memories(memoryResponses)
                .build();
    }

    @Override
    @Transactional
    public Boolean addMemoryLike(Long userSeq, Long memorySeq) {
        logger.info("addMemoryLike 호출");

        Optional<MemoryLike> memoryLike = memoryLikeRepository.findByUser_SequenceAndMemory_Sequence(userSeq, memorySeq);

        if (memoryLike.isPresent()) {
            if (memoryLike.get().getIsSelected()) {
                return false;
            }

            memoryLike.get().updateIsSelected(true);
            return true;
        }

        User user = userRepository.findBySequence(userSeq);
        Memory memory = memoryRepository.findBySequence(memorySeq);

        if (memory.getIsDeleted()) {
            return false;
        }

        memoryLikeRepository.save(MemoryLike.builder()
                .user(user)
                .memory(memory)
                .build());

        return true;
    }

    @Override
    @Transactional
    public Boolean removeMemoryLike(Long userSeq, Long memorySeq) {
        logger.info("removeMemorylike 호출");

        Optional<MemoryLike> memoryLike = memoryLikeRepository.findByUser_SequenceAndMemory_Sequence(userSeq, memorySeq);

        if (memoryLike.isPresent() & memoryLike.get().getIsSelected()) {
            memoryLike.get().updateIsSelected(false);
            return true;
        }

        return false;
    }
}
