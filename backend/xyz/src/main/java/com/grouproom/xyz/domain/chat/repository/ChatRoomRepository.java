package com.grouproom.xyz.domain.chat.repository;

import com.grouproom.xyz.domain.chat.entity.ChatRoom;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomRepository extends MongoRepository<ChatRoom, ObjectId> {
    ChatRoom findByChatRoomId(ObjectId chatRoomId);
}
