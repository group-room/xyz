package com.grouproom.xyz.domain.azt.service;

import com.grouproom.xyz.domain.azt.dto.request.AztRequest;

public interface AztService {

    String addAzt(Long loginSeq, AztRequest aztRequest);
    String modifyAzt(Long loginSeq, AztRequest aztRequest);
}
