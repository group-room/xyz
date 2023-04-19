package com.grouproom.xyz.domain.album.entity;

import com.grouproom.xyz.global.model.BaseTimeEntity;
import com.grouproom.xyz.global.model.FileType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "album_file")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AlbumFile extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sequence")
    private Long sequence;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "album_sequence")
    private Album album;

    @Enumerated
    @Column(name = "file_type")
    private FileType fileType;

    @Column(name = "file_path")
    private boolean filePath;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) default 0")
    private Boolean isDeleated;
}
