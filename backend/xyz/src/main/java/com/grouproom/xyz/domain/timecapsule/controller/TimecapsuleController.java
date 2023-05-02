package com.grouproom.xyz.domain.timecapsule.controller;

import com.grouproom.xyz.domain.timecapsule.dto.reqeust.AddTimecapsuleRequest;
import com.grouproom.xyz.domain.timecapsule.dto.response.AddTimecapsuleResponse;
import com.grouproom.xyz.domain.timecapsule.service.TimecapsuleService;
import com.grouproom.xyz.global.model.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/timecapsule")
@RequiredArgsConstructor
public class TimecapsuleController {

    private final TimecapsuleService timecapsuleService;
    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.timecapsule.controller.TimecapsuleController");

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public BaseResponse<?> addTimecapsule(@RequestPart AddTimecapsuleRequest addTimecapsuleRequest, @RequestPart(required = false) List<MultipartFile> images, @RequestPart(required = false) List<MultipartFile> audios) throws Exception {
        logger.info("addTimecapsule 호출");

        Long userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        AddTimecapsuleResponse addTimecapsuleResponse = timecapsuleService.addTimecapsule(userSeq, addTimecapsuleRequest, images, audios);

        return new BaseResponse(addTimecapsuleResponse);
    }
}
