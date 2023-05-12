package com.grouproom.chat.repository;

import com.grouproom.chat.entity.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * packageName    : com.example.WebSocketAndKafka.repository
 * fileName       : MongoDBRepository
 * author         : SSAFY
 * date           : 2023-05-10
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-05-10        SSAFY       최초 생성
 */
@Repository
public interface MongoDBRepository extends MongoRepository<Chat, Long> {
    public List<Chat> findTop20ByRoomOrderByIdDesc(String room);
    public List<Chat> findTop20ByIdLessThanOrderByIdDesc(Long id);
}