package com.grouproom.xyz.domain.chat.entity;

import com.grouproom.xyz.domain.user.entity.User;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Embedded;
import javax.persistence.Id;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Document
@Getter
@Setter
public class ChatRoom {

    @Id
    private ObjectId chatRoomId;
    private String topic;
    private List<User> members;
    private LocalDateTime createdAt;
    @Embedded
    private ChatMessage lastMessage; // lastMessage의 timestamp로 정렬
    @Embedded
    private List<ChatMessage> messages; // ChatMessage 리스트
    private Map<Long, Long> userOffsets; // 유저마다 어디까지 읽었는지
    private Map<Long, LocalDateTime> userDisconnectAt; // 유저마다 연결 되어 있는지(차단한 쪽, 탈퇴한 쪽은 접근 불가). // 연결 끊긴 시간 입력. 다시 연결되면 null로 전환

}
