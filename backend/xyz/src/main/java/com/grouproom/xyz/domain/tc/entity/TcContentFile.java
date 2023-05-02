package com.grouproom.xyz.domain.tc.entity;

import com.grouproom.xyz.global.model.BaseTimeEntity;
import com.grouproom.xyz.global.model.FileType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "tc_content_file")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TcContentFile extends BaseTimeEntity {

    @Id
    @Column(name = "sequence")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sequence;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "tc_content_sequence")
    private TcContent tcContent;

    @Enumerated
    @Column(name = "file_type")
    private FileType fileType;

    @Column(name = "file_path")
    private String filePath;

    @Builder
    public TcContentFile(TcContent tcContent, FileType fileType, String filePath) {
        this.tcContent = tcContent;
        this.fileType = fileType;
        this.filePath = filePath;
    }
}
