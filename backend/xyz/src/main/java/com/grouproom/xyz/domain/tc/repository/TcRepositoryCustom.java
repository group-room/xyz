package com.grouproom.xyz.domain.tc.repository;

import com.grouproom.xyz.domain.tc.dto.response.OpenedTcResponse;

import java.util.List;

public interface TcRepositoryCustom {
    List<OpenedTcResponse> findOpenedTcListByUser_Seq(Long userSeq);
}
