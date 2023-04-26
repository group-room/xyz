package com.grouproom.xyz.domain.memory.service;

import com.grouproom.xyz.domain.memory.dto.request.AddMemoryRequest;
import com.grouproom.xyz.domain.memory.dto.request.MemoryListRequest;
import com.grouproom.xyz.domain.memory.dto.response.AddMemoryResponse;
import com.grouproom.xyz.domain.memory.dto.response.MemoryListResponse;
import com.grouproom.xyz.domain.memory.dto.response.MemoryResponse;
import com.grouproom.xyz.domain.memory.entity.Memory;
import com.grouproom.xyz.domain.memory.entity.MemoryFile;
import com.grouproom.xyz.domain.memory.repository.MemoryCommentRepository;
import com.grouproom.xyz.domain.memory.repository.MemoryFileRepository;
import com.grouproom.xyz.domain.memory.repository.MemoryRepository;
import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.domain.user.repository.UserRepository;
import com.grouproom.xyz.global.model.FileType;
import com.grouproom.xyz.global.service.S3UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class MemoryServiceImpl implements MemoryService {

    private final UserRepository userRepository;
    private final S3UploadService s3UploadService;
    //    private final AztRepository aztRepository;
    private final MemoryRepository memoryRepository;
    private final MemoryFileRepository memoryFileRepository;
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
    public MemoryListResponse findMemory(Long loginUserSeq, MemoryListRequest memoryListRequest) {
        logger.info("findMemory 호출");

        // TODO: 무한스크롤 구현 필요
        if (memoryListRequest.getIsLocationBased() == false) {
            logger.info("isLocationBased == false");
            List<MemoryResponse> memoryResponseList = memoryRepository.findByUserSeq(loginUserSeq, memoryListRequest.getAztSeq(), memoryListRequest.getDate());
            return MemoryListResponse.builder()
                    .memories(memoryResponseList)
                    .build();
        }

        logger.info("isLocationBased == true");
        List<MemoryResponse> memoryResponseList = memoryRepository.findByUserSeqAndCoordinate(loginUserSeq, memoryListRequest.getAztSeq(), memoryListRequest.getLatitude(), memoryListRequest.getLongitude(), memoryListRequest.getDate());
        return MemoryListResponse.builder()
                .memories(memoryResponseList)
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
    public Boolean removeMemory(Long loginSeq, Long memorySeq) {
        logger.info("removeMemory 호출");

        User user = userRepository.findBySequence(loginSeq);
        Memory memory = memoryRepository.findBySequence(memorySeq);
        if (user.equals(memory.getUser())) {
            memory.updateIsDeleted(true);
            return true;
        }
        return false;
    }
}
