package com.grouproom.xyz.domain.myroom.repository;

import com.grouproom.xyz.domain.myroom.entity.Sticker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StickerRepository extends JpaRepository<Sticker,Long>, StickerRepositoryCustom {
}
