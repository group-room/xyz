"use client";

import TabBar from "@/components/TabBar";
import ChatRoomItem from "@/components/chatting/ChatRoomItem";
import {
  useChattingList,
  useChattingListRecentMessage,
} from "@/hooks/queries/chatting";
import { useAppSelector } from "@/hooks/redux";
import React from "react";

function ChatPage() {
  const loggedInUserSeq = useAppSelector(
    (state) => state.auth.userInfo?.userSeq
  )?.toString();
  const { data: chatroomList, isLoading } = useChattingList();
  const { data: chatroomListRecentMessage, isLoading: isLoadingRecentMessage } =
    useChattingListRecentMessage(loggedInUserSeq!);
  if (!chatroomList || !chatroomListRecentMessage) {
    return <div>로딩중...</div>;
  }
  return (
    <>
      <div className="pt-2">
        {chatroomList.length ? (
          chatroomList.map((chatroom) => {
            return (
              <ChatRoomItem
                key={chatroom.sequence}
                chatroom={chatroom}
                recentMessage={
                  chatroomListRecentMessage.filter(
                    (message) => message.room === chatroom.sequence.toString()
                  )[0]
                }
              />
            );
          })
        ) : (
          <div className="p-5 text-center">
            <p>아직 채팅방이 없어요 ㅠㅠ</p>
            <p>아지트 혹은 친구를 만들어볼까요?</p>
          </div>
        )}
      </div>
      <TabBar />
    </>
  );
}

export default ChatPage;
