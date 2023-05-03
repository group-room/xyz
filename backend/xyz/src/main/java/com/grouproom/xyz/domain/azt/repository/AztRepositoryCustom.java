package com.grouproom.xyz.domain.azt.repository;

import com.grouproom.xyz.domain.azt.dto.response.AztResponse;

import java.util.List;

public interface AztRepositoryCustom {

    List<AztResponse> selectAzt(Long loginseq, Boolean isDeleted);
}
