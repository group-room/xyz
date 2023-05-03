package com.grouproom.xyz.domain.chat.dto.response;

import java.util.List;

public class ChatRoomDetailResponse {

    private String chatRoomId;
    private String chatRoomName; // azt일 경우 azt 이름, 친구일 경우 친구 닉네임
    private String chatRoomImage; // azt일 경우 azt 대표사진, 친구일 경우 친구 프로필사진
    private List<ChatUserResponse> members;
    private Integer memberCount; // 인원수
    private List<ChatMessageResponse> messages; // 채팅 내역
    private Long offsets; // 어디까지 읽었는지
    private Boolean isConnected; // 연결되었는지
}
