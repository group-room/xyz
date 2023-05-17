package com.grouproom.xyz.domain.chat.service;

import com.grouproom.xyz.domain.chat.dto.response.RoomDetailResponse;
import com.grouproom.xyz.domain.chat.dto.response.RoomMemberResponse;
import com.grouproom.xyz.domain.chat.dto.response.RoomsResponse;
import com.grouproom.xyz.domain.chat.repository.ChatRepository;
import com.grouproom.xyz.domain.friend.entity.Friend;
import com.grouproom.xyz.domain.friend.repository.FriendRepository;
import com.grouproom.xyz.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
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
    public RoomDetailResponse findChat(Long loginSeq, Long chatSeq) {

        logger.info("채팅 상세 조회 호출");
        RoomDetailResponse response = chatRepository.selectAztChat(chatSeq);
        if(null != response) {
            List<User> users = chatRepository.selectAztChatMember(chatSeq);
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
        } else {
            response = chatRepository.selectFriendChat(loginSeq, chatSeq);
            Friend friend = friendRepository.findByChatSeq_Sequence(chatSeq);
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
        }
    }
}
