package com.grouproom.xyz.domain.memory.service;

import com.grouproom.xyz.domain.memory.dto.request.MemoryListRequest;
import com.grouproom.xyz.domain.memory.dto.response.MemoryListResponse;
import com.grouproom.xyz.domain.memory.dto.response.MemoryResponse;
import com.grouproom.xyz.domain.memory.repository.MemoryRepository;
import com.grouproom.xyz.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class MemoryServiceImpl implements MemoryService {

    private final UserRepository userRepository;
    private final MemoryRepository memoryRepository;
    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.memory.service.MemoryServiceImpl");


    @Override
    @Transactional(readOnly = true)
    public MemoryListResponse findMemory(Long loginUserSeq, MemoryListRequest memoryListRequest) {
        logger.info("findMemory 호출");

        // TODO: date 처리 필요, 무한스크롤 구현 필요
        if (memoryListRequest.getIsLocationBased() == false) {
            logger.info("isLocationBased == false");
            List<MemoryResponse> memoryResponseList = memoryRepository.findByUserSeq(loginUserSeq, memoryListRequest.getAztSeq(), null);
            return MemoryListResponse.builder()
                    .memories(memoryResponseList)
                    .build();
        }

        logger.info("isLocationBased == true");
        List<MemoryResponse> memoryResponseList = memoryRepository.findByUserSeqAndCoordinate(loginUserSeq, memoryListRequest.getAztSeq(), memoryListRequest.getLatitude(), memoryListRequest.getLongitude(), null);
        return MemoryListResponse.builder()
                .memories(memoryResponseList)
                .build();
    }
}
