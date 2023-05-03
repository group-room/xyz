package com.grouproom.xyz.domain.azt.service;

import com.grouproom.xyz.domain.azt.dto.request.AddAztMemberRequest;
import com.grouproom.xyz.domain.azt.dto.request.AddAztRequest;
import com.grouproom.xyz.domain.azt.dto.request.ModifyAztRequest;
import com.grouproom.xyz.domain.azt.dto.response.AztListResponse;
import com.grouproom.xyz.domain.azt.dto.response.AztResponse;
import com.grouproom.xyz.domain.azt.dto.response.MemberListResponse;
import org.springframework.web.multipart.MultipartFile;

public interface AztService {

    AztListResponse findAztList(Long loginSeq);
    AztResponse findAzt(Long loginSeq, Long aztSeq);
    AztResponse addAzt(Long loginSeq, AddAztRequest addAztRequest, MultipartFile image);
    AztResponse modifyAzt(Long loginSeq, ModifyAztRequest modifyAztRequest, MultipartFile image);
    AztResponse addAztMember(Long loginSeq, AddAztMemberRequest addAztMemberRequest);
    MemberListResponse findFriendForMembers(Long loginSeq, Long aztSeq);
    AztListResponse modifyAztMemberToDelete(Long loginSeq, Long aztSeq);
}
