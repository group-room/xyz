package com.grouproom.xyz.domain.tc.dto.response;

import com.grouproom.xyz.domain.tc.entity.Tc;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class OpenedTcInfoResponse {
    private Long userSeq;
    private String userNickname;
    private Long aztSeq;
    private String aztName;
    private String openedAt;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String location;

    @Builder
    public OpenedTcInfoResponse(Tc tc) {
        this.userSeq = tc.getUser().getSequence();
        this.userNickname = tc.getUser().getNickname();
        this.aztSeq = tc.getAzt().getSequence();
        this.aztName = tc.getAzt().getAztName();
        this.openedAt = tc.getUpdatedAt().toString();
        this.latitude = tc.getLatitude();
        this.longitude = tc.getLongitude();
        this.location = tc.getLocation();
    }
}
