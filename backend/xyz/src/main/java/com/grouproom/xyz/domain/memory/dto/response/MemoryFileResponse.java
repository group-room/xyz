package com.grouproom.xyz.domain.memory.dto.response;

import com.grouproom.xyz.domain.memory.entity.MemoryFile;
import lombok.Data;

@Data
public class MemoryFileResponse {
    private String fileType;
    private String filePath;

    public MemoryFileResponse(MemoryFile memoryFile) {
        this.fileType = memoryFile.getFileType().toString();
        this.filePath = memoryFile.getFilePath();
    }
}