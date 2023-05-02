package com.grouproom.xyz.domain.timecapsule.dto.response;

import com.grouproom.xyz.domain.timecapsule.entity.Timecapsule;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class OpenedTimecapsuleResponse {
    private Long userSeq;
    private String userNickname;
    private Long aztSeq;
    private String aztName;
    private String openStart;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String location;

    @Builder
    public OpenedTimecapsuleResponse(Timecapsule timecapsule) {
        this.userSeq = timecapsule.getUser().getSequence();
        this.userNickname = timecapsule.getUser().getNickname();
        this.aztSeq = timecapsule.getAzt().getSequence();
        this.aztName = timecapsule.getAzt().getAztName();
        this.openStart = timecapsule.getOpenStart().toString();
        this.latitude = timecapsule.getLatitude();
        this.longitude = timecapsule.getLongitude();
        this.location = timecapsule.getLocation();
    }
}
