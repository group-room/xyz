package com.grouproom.xyz.domain.chat.dto.response;

import java.time.LocalDateTime;

public class ChatRoomListResponse {

    private String chatRoomId;
    private String chatRoomName; // azt일 경우 azt 이름, 친구일 경우 친구 닉네임
    private String chatRoomImage; // azt일 경우 azt 대표사진, 친구일 경우 친구 프로필사진
    private Integer memberCount; // 인원수
    private Long lastMessageSender;
    private LocalDateTime lastMessageTime;
    private String lastMessageContent;
    private Long unread; // 안 읽은 개수
    private Boolean isConnected; // 연결되었는지
}
