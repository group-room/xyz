package com.grouproom.xyz.domain.user.service;

import com.grouproom.xyz.domain.user.dto.response.ModifierResponse;
import com.grouproom.xyz.domain.user.dto.response.ProfileResponse;

import java.util.List;


public interface UserService {

    void removeUser(Long userSequence);

    List<ModifierResponse> findModifierByUserSequence(Long userSequence);

    ProfileResponse findProfileByUserSeq(Long fromUserSeq, Long toUserSeq);

    ProfileResponse findProfileByUserSeq(Long myUserSeq);

    void modifyProfile(Long userSeq, String nickname, String profileImagePath, String backgroundImagePath, String introduce, Long modifierSeq);
}
