package com.grouproom.xyz.domain.chat.service;

import com.grouproom.xyz.domain.chat.dto.request.ChatDetailRequest;
import com.grouproom.xyz.domain.chat.dto.response.RoomDetailResponse;
import com.grouproom.xyz.domain.chat.dto.response.RoomMemberResponse;
import com.grouproom.xyz.domain.chat.dto.response.RoomsResponse;
import com.grouproom.xyz.domain.chat.repository.ChatRepository;
import com.grouproom.xyz.domain.friend.entity.Friend;
import com.grouproom.xyz.domain.friend.repository.FriendRepository;
import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.global.exception.ErrorResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;


@RequiredArgsConstructor
@Service
public class ChatServiceImpl implements ChatService {

    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.chat.controller.ChatServiceImpl");
    private final ChatRepository chatRepository;
    private final FriendRepository friendRepository;

    @Override
    public RoomsResponse findChat(Long loginSeq) {

        logger.info("findChat 호출");
        
        return RoomsResponse.builder()
                .chats(chatRepository.selectChats(loginSeq, false))
                .build();
    }

    @Override
    public RoomDetailResponse findChat(Long loginSeq, ChatDetailRequest chatDetailRequest) {

        logger.info("채팅 상세 조회 호출");
        String type = chatDetailRequest.getType();
        logger.info("type : " + type);
        if(type.equals("azt")) {
            RoomDetailResponse response = chatRepository.selectAztChat(chatDetailRequest.getChatSeq());
            List<User> users = chatRepository.selectAztChatMember(chatDetailRequest.getChatSeq());
            List<RoomMemberResponse> members = new ArrayList<>();
            for (User user:users) {
                members.add(RoomMemberResponse.builder()
                                .userSeq(user.getSequence())
                                .profileImage(user.getProfileImage())
                                .nickname(user.getNickname())
                        .build());
            }
            response.setMembers(members);
            return response;
        } else if(type.equals("friend")) {
            RoomDetailResponse response = chatRepository.selectFriendChat(loginSeq, chatDetailRequest.getChatSeq());
            Friend friend = friendRepository.findByChatSeq_Sequence(chatDetailRequest.getChatSeq());
            List<RoomMemberResponse> members = new ArrayList<>();
            members.add(RoomMemberResponse.builder()
                    .userSeq(friend.getFromUser().getSequence())
                    .profileImage(friend.getFromUser().getProfileImage())
                    .nickname(friend.getFromUser().getNickname())
                    .build());
            members.add(RoomMemberResponse.builder()
                    .userSeq(friend.getToUser().getSequence())
                    .profileImage(friend.getToUser().getProfileImage())
                    .nickname(friend.getToUser().getNickname())
                    .build());
            response.setMembers(members);
            return response;
        } else {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "잘못된 요청");
        }
    }
}
