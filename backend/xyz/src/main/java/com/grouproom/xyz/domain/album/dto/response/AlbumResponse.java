package com.grouproom.xyz.domain.album.dto.response;

import com.grouproom.xyz.domain.album.entity.Accessibility;
import lombok.Data;

@Data
public class AlbumResponse {
    private Long albumSeq;
//    private String albumImage;
    private String accessibility;
    private Long aztSeq;
    private String aztName;
//    private String date;
//    private BigDecimal latitude;
//    private BigDecimal longitude;
//    private String location;

    public AlbumResponse(Long albumSeq, Accessibility accessibility, Long aztSeq, String aztName) {
        this.albumSeq = albumSeq;
//        this.albumImage = album.
        this.accessibility = accessibility.toString();
        this.aztSeq = aztSeq;
        this.aztName = aztName;
//        this.date = date.toString();
//        this.latitude = latitude;
//        this.longitude = longitude;
//        this.location = location;
    }

//    @Builder
//    public AlbumResponse(Album album) {
//        this.albumSeq = album.getSequence();
////        this.albumImage = album.
//        this.accessibility = album.getAccessibility().toString();
//        this.aztSeq = album.getAzt().getSequence();
//        this.aztName = album.getAzt().getAztName();
//        this.date = String.valueOf(album.getDate());
//        this.latitude = album.getLatitude();
//        this.longitude = album.getLongitude();
//        this.location = album.getLocation();
//    }
}