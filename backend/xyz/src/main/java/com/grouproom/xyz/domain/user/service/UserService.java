package com.grouproom.xyz.domain.user.service;

import com.grouproom.xyz.domain.user.dto.response.ModifierResponse;

import java.util.List;


public interface UserService {

    void removeUser(Long userSequence);

    List<ModifierResponse> findModifierByUserSequence(Long userSequence);

}
