package com.grouproom.xyz.domain.timecapsule.entity;

import com.grouproom.xyz.global.model.BaseTimeEntity;
import com.grouproom.xyz.global.model.FileType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "timecapsule_content_file")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TimecapsuleContentFile extends BaseTimeEntity {

    @Id
    @Column(name = "sequence")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sequence;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "timecapsule_content_sequence")
    private TimecapsuleContent timecapsuleContentSequence;

    @Enumerated
    @Column(name = "file_type")
    private FileType fileType;

    @Column(name = "file_path")
    private boolean filePath;
}
