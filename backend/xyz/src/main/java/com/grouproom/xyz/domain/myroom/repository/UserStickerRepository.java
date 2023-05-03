package com.grouproom.xyz.domain.myroom.repository;

import com.grouproom.xyz.domain.myroom.entity.UserSticker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserStickerRepository extends JpaRepository<UserSticker, Long>, UserStickerRepositoryCustom {
}
