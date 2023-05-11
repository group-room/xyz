package com.grouproom.xyz.domain.chat.dto.response;

import java.util.List;

public class RoomDetailResponse {

    // 채팅방 시퀀스, 아지트 이름(or 친구 닉네임), 아지트 시퀀스(or 친구 유저시퀀스)
    // 멤버 정보 배열 : 유저시퀀스, 이미지, 닉네임
    private Long chatSeq;
    private String name;
    private String type; // 아지트 or 친구
    private Long aztSeq;
    private Long userSeq;
    private List<RoomMemberResponse> members; // 본인 포함(본인이 0번)
}
