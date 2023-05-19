package com.grouproom.xyz.domain.user.repository;

import com.grouproom.xyz.domain.user.entity.Modifier;

import java.util.Optional;

public interface ModifierRepositoryCustom {
    Optional<Modifier> selectModifierByRandom();
}
