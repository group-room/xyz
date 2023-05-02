package com.grouproom.xyz.domain.timecapsule.dto.response;

import com.grouproom.xyz.domain.timecapsule.entity.TimecapsuleContentFile;
import lombok.Builder;
import lombok.Data;

@Data
public class TimecapsuleContentFileResponse {
    private String fileType;
    private String filePath;

    @Builder
    public TimecapsuleContentFileResponse(TimecapsuleContentFile timecapsuleContentFile) {
        this.fileType = timecapsuleContentFile.getFileType().toString();
        this.filePath = timecapsuleContentFile.getFilePath();
    }
}
