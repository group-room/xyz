package com.grouproom.xyz.domain.album.repository;

import com.grouproom.xyz.domain.album.entity.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long>, AlbumRepositoryCustom {
}
