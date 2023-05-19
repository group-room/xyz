package com.grouproom.xyz.domain.user.service;

import com.grouproom.xyz.domain.user.dto.response.ModifierResponse;
import com.grouproom.xyz.domain.user.dto.response.ProfileResponse;
import com.grouproom.xyz.domain.user.dto.response.VisitorResponse;

import java.util.List;


public interface UserService {

    void removeUser(Long userSequence);

    List<ModifierResponse> findModifierByUserSequence(Long userSequence);

    ProfileResponse findProfileByUserSeq(Long fromUserSeq, Long toUserSeq);

    ProfileResponse findProfileByUserSeq(Long myUserSeq);

    void modifyProfile(Long userSeq, String nickname, String profileImagePath, String backgroundImagePath, String introduce, Long modifierSeq);

    void addVisitor(Long fromUserSeq,Long toUserSeq,String content);

    void removeVisitor(Long userSeq,Long visitorSeq);

    List<VisitorResponse> findVisitorByUserSequence(Long toUserSeq);

    void logout(Long userSeq);
}
