package com.grouproom.xyz.domain.azt.service;

import com.grouproom.xyz.domain.azt.dto.request.AztRequest;
import com.grouproom.xyz.domain.azt.dto.response.AztListResponse;
import com.grouproom.xyz.domain.azt.dto.response.AztResponse;
import com.grouproom.xyz.domain.azt.dto.response.MemberListResponse;
import org.springframework.web.multipart.MultipartFile;

public interface AztService {

    AztListResponse findAztList(Long loginSeq);
    AztResponse findAzt(Long loginSeq, Long aztSeq);
    AztResponse addAzt(Long loginSeq, AztRequest aztRequest, MultipartFile image);
    AztResponse modifyAzt(Long loginSeq, AztRequest aztRequest, MultipartFile image);
    AztResponse addAztMember(Long loginSeq, AztRequest aztRequest);
    MemberListResponse findFriendForMembers(Long loginSeq, Long aztSeq);
    AztListResponse modifyAztMemberToDelete(Long loginSeq, Long aztSeq);
}
