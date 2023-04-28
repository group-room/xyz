package com.grouproom.xyz.domain.memory.entity;

import com.grouproom.xyz.global.model.BaseTimeEntity;
import com.grouproom.xyz.global.model.FileType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "memory_file")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemoryFile extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sequence")
    private Long sequence;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memory_sequence")
    private Memory memory;

    @Enumerated
    @Column(name = "file_type")
    private FileType fileType;

    @Column(name = "file_path")
    private String filePath;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @Builder
    public MemoryFile(Memory memory, FileType fileType, String filePath) {
        this.memory = memory;
        this.fileType = fileType;
        this.filePath = filePath;
        this.isDeleted = false;
    }

    public void updateIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
}
