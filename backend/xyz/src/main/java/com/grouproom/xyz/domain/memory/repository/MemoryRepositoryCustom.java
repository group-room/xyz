package com.grouproom.xyz.domain.memory.repository;

import com.grouproom.xyz.domain.memory.dto.response.MemoryResponse;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface MemoryRepositoryCustom {

    List<MemoryResponse> findByUserSeq(Long userSeq, Long aztSeq, LocalDate date);
    List<MemoryResponse> findByUserSeqAndCoordinate(Long userSeq, Long aztSeq, BigDecimal latitude, BigDecimal longitude, LocalDate date);
}