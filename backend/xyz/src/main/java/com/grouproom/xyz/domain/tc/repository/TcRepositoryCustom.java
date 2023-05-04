package com.grouproom.xyz.domain.tc.repository;

import com.grouproom.xyz.domain.tc.dto.response.OpenedTcResponse;
import com.grouproom.xyz.domain.tc.dto.response.TcResponse;

import java.util.List;
import java.util.Optional;

public interface TcRepositoryCustom {
    List<OpenedTcResponse> findOpenedTcListByUser_Seq(Long userSeq);

    Optional<OpenedTcResponse> findRandomOpenedTcByUser_Seq(Long userSeq);

    List<TcResponse> findWaitingTcListByUser_Seq(Long userSeq);
}
