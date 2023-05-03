package com.grouproom.xyz.domain.user.repository;

import com.grouproom.xyz.domain.user.dto.response.BgmResponse;
import com.grouproom.xyz.domain.user.dto.response.FriendshipResponse;
import com.grouproom.xyz.domain.user.dto.response.ModifierResponse;
import com.grouproom.xyz.domain.user.dto.response.ProfileResponse;
import com.grouproom.xyz.domain.user.entity.SocialType;
import com.grouproom.xyz.domain.user.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserRepositoryCustom {
    Optional<Long> selectUserBySocialId(SocialType type, String id);

    List<ModifierResponse> selectModifierByUserSeq(Long userSeq);

    Optional<FriendshipResponse> selectFriendshipByUserSeq(User fromUser, User toUser);

    Optional<ProfileResponse> selectProfileByUserSeq(User targetUser);

    List<BgmResponse> selectBgmByUserSeq(User targetUser);

    Optional<String> selectNicknameByRandom();

    Optional<String> selectTokenByUserSeq(Long userSeq);

}
