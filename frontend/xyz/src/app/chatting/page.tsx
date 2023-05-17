"use client";

import TabBar from "@/components/TabBar";
import ChatRoomItem from "@/components/chatting/ChatRoomItem";
import LoadingLottie from "@/components/lottie/Loading";
import NotResultLottie from "@/components/lottie/NotResult";
import {
  useChattingList,
  useChattingListRecentMessage,
} from "@/hooks/queries/chatting";
import { useAppSelector } from "@/hooks/redux";
import { ChattingRoomListTypes } from "@/types/chatting";
import React from "react";

function ChatPage() {
  const loggedInUserSeq = useAppSelector(
    (state) => state.auth.userInfo?.userSeq
  )?.toString();
  const { data: chatroomList, isLoading: isLoadingChatroomList } =
    useChattingList();
  const { data: chatroomListRecentMessage, isLoading: isLoadingRecentMessage } =
    useChattingListRecentMessage(loggedInUserSeq!);

  if (isLoadingChatroomList || isLoadingRecentMessage) {
    return (
      <div className="flex justify-center align-middle py-60">
        <LoadingLottie />
      </div>
    );
  }

  if (chatroomList && chatroomListRecentMessage) {
    // 최근 메시지 순서대로 채팅방 정렬하기
    interface unionType extends ChattingRoomListTypes {
      text: string;
      time: string;
    }
    let chatroomListWithMsg: unionType[] = [];
    chatroomList.forEach((chatroom) => {
      chatroomListRecentMessage.forEach((message) => {
        if (chatroom.sequence === +message.room) {
          const msgData = { text: message.text, time: message.time };
          chatroomListWithMsg.push({ ...chatroom, ...msgData });
        }
      });
    });
    const sortedChatroomListWithMsg = chatroomListWithMsg.sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );

    return (
      <>
        <div className="pt-2">
          {sortedChatroomListWithMsg.length ? (
            sortedChatroomListWithMsg.map((chatroom) => {
              return (
                <ChatRoomItem
                  key={chatroom.sequence}
                  sortedChatroom={chatroom}
                />
              );
            })
          ) : (
            <div className="p-5 text-center">
              <NotResultLottie />
              <p>아직 채팅방이 없어요 ㅠㅠ</p>
              <p>아지트 혹은 친구를 만들어볼까요?</p>
            </div>
          )}
        </div>
        <TabBar />
      </>
    );
  }
}

export default ChatPage;
