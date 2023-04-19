package com.grouproom.xyz.domain.album.entity;

import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.global.model.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@IdClass(UserAlbumID.class)
@Table(name = "album_bookmark")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AlbumBookmark extends BaseTimeEntity {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_sequence")
    private User user;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "album_sequence")
    private Album album;

    @Column(name = "is_selected", columnDefinition = "tinyint(1) default 1")
    private Boolean isSelected;
}
