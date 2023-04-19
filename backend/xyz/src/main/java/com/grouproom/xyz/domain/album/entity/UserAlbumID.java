package com.grouproom.xyz.domain.album.entity;

import lombok.*;

import java.io.Serializable;

@Data
@Getter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class UserAlbumID implements Serializable {

    private Long user;
    private Long album;
}
