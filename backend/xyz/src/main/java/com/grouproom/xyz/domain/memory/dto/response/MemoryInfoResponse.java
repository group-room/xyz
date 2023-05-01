package com.grouproom.xyz.domain.memory.dto.response;

import com.grouproom.xyz.domain.memory.entity.Memory;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class MemoryInfoResponse {

    private Long userSeq;
    private String userNickname;
    private Long aztSeq;
    private String aztName;
    private String content;
    private String date;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String location;
    private Boolean isLiked;
    private Integer likeCnt;
    private Integer commentCnt;
    private List<MemoryFileResponse> files;

    @Builder
    public MemoryInfoResponse(Memory memory, List<MemoryFileResponse> files) {
        this.userSeq = memory.getUser().getSequence();
        this.userNickname = memory.getUser().getNickname();
        this.aztSeq = memory.getAzt().getSequence();
        this.aztName = memory.getAzt().getAztName();
        this.content = memory.getContent();
        this.date = memory.getDate().toString();
        this.latitude = memory.getLatitude();
        this.longitude = memory.getLongitude();
        this.location = memory.getLocation();
        this.files = files;
    }
}
