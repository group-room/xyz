package com.grouproom.xyz.domain.timecapsule.service;

import com.grouproom.xyz.domain.timecapsule.dto.reqeust.AddTimecapsuleRequest;
import com.grouproom.xyz.domain.timecapsule.dto.response.AddTimecapsuleResponse;
import com.grouproom.xyz.domain.timecapsule.dto.response.OpenedTimecapsuleDetailsResponse;
import com.grouproom.xyz.domain.timecapsule.entity.TimecapsuleContent;
import com.grouproom.xyz.global.model.FileType;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TimecapsuleService {

    void saveTimecapsulecontentFiles(TimecapsuleContent timecapsuleContent, FileType fileType, List<String> filePaths);

    AddTimecapsuleResponse addTimecapsule(Long userSeq, AddTimecapsuleRequest addTimecapsuleRequest, List<MultipartFile> images, List<MultipartFile> audios);

    void addTimecapsuleContent(Long userSeq, Long timecapsuleSeq, String content, List<MultipartFile> images, List<MultipartFile> audios);

    OpenedTimecapsuleDetailsResponse findOpenedTimecapsuleDetails(Long userSeq, Long timecapsuleSeq);
}
