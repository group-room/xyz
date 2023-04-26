package com.grouproom.xyz.domain.user.repository;

import com.grouproom.xyz.domain.user.dto.response.VisitorResponse;
import com.grouproom.xyz.domain.user.entity.User;

import java.util.List;

public interface VisitorRepositoryCustom {
    List<VisitorResponse> selectVisitorByUserSeq(User toUser);
}
