package com.grouproom.xyz.domain.tc.repository;

import com.grouproom.xyz.domain.tc.dto.response.OpenedTcResponse;
import com.grouproom.xyz.domain.tc.dto.response.TcResponse;
import com.grouproom.xyz.domain.tc.entity.Tc;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface TcRepositoryCustom {
    List<OpenedTcResponse> findOpenedTcListByUser_Seq(Long userSeq);

    Optional<OpenedTcResponse> findRandomOpenedTcByUser_Seq(Long userSeq);

    List<TcResponse> findWaitingTcListByUser_Seq(Long userSeq);

    List<Tc> findTcListByUser_Seq(Long userSeq);

    List<Tc> findOpenableTcByUser_SeqAndCoordinates(Long userSeq, BigDecimal latitude, BigDecimal longitude);
}
