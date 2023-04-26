package com.grouproom.xyz.domain.album.dto.response;

import com.grouproom.xyz.domain.album.entity.Accessibility;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class AlbumResponse {
    private Long albumSeq;
    //    private String albumImage;
    private String accessibility;
    private Long aztSeq;
    private String aztName;
    //    private String date;
    private BigDecimal latitude;
    private BigDecimal longitude;
//    private String location;

    public AlbumResponse(Long albumSeq, Accessibility accessibility, Long aztSeq, String aztName, BigDecimal latitude, BigDecimal longitude) {
        this.albumSeq = albumSeq;
//        this.albumImage = album.
        this.accessibility = accessibility.toString();
        this.aztSeq = aztSeq;
        this.aztName = aztName;
//        this.date = date.toString();
        this.latitude = latitude;
        this.longitude = longitude;
//        this.location = location;
    }
}