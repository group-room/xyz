package com.grouproom.xyz.domain.memory.repository;

import com.grouproom.xyz.domain.memory.dto.response.MemoryResponse;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface MemoryRepositoryCustom {

    List<MemoryResponse> findByUserSeq(Long userSeq, Long aztSeq, LocalDateTime date);

    List<MemoryResponse> findByUserSeqAndCoordinate(Long userSeq, Long aztSeq, BigDecimal latitude, BigDecimal longitude, LocalDateTime date);
}