package com.grouproom.xyz.domain.user.repository;

import com.grouproom.xyz.domain.user.dto.response.ModifierResponse;
import com.grouproom.xyz.domain.user.entity.SocialType;

import java.util.List;
import java.util.Optional;

public interface UserRepositoryCustom {
    Optional<Long> findUserBySocialId(SocialType type, String id);

    List<ModifierResponse> selectModifierByUserSequence(Long userSequence);
}
