package com.grouproom.xyz.domain.tc.dto.response;

import com.grouproom.xyz.domain.tc.entity.TcContentFile;
import lombok.Builder;
import lombok.Data;

@Data
public class TcContentFileResponse {
    private String fileType;
    private String filePath;

    @Builder
    public TcContentFileResponse(TcContentFile tcContentFile) {
        this.fileType = tcContentFile.getFileType().toString();
        this.filePath = tcContentFile.getFilePath();
    }
}
