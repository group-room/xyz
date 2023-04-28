package com.grouproom.xyz.domain.azt.service;

import com.grouproom.xyz.domain.azt.dto.request.AztRequest;
import com.grouproom.xyz.domain.azt.dto.response.AztResponse;
import com.grouproom.xyz.domain.azt.dto.response.MemberListResponse;

public interface AztService {

    AztResponse findAzt(Long loginSeq, Long aztSeq);
    String addAzt(Long loginSeq, AztRequest aztRequest);
    String modifyAzt(Long loginSeq, AztRequest aztRequest);
    String addAztMember(Long loginSeq, AztRequest aztRequest);
    MemberListResponse findFriendForMembers(Long loginSeq, Long aztSeq);
    String modifyAztMemberToDelete(Long loginSeq, Long aztSeq);
}
