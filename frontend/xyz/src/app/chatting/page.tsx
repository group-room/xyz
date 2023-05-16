"use client";

import TabBar from "@/components/TabBar";
import ChatRoomItem from "@/components/chatting/ChatRoomItem";
import {
  useChattingList,
  useChattingListRecentMessage,
} from "@/hooks/queries/chatting";
import React from "react";

function ChatPage() {
  const { data: chatroomList, isLoading } = useChattingList();
  const { data: chatroomListRecentMessage, isLoading: isLoadingRecentMessage } =
    useChattingListRecentMessage();
  if (!chatroomList || !chatroomListRecentMessage) {
    return <div>로딩중...</div>;
  }
  return (
    <>
      <div className="pt-2">
        {chatroomList.map((chatroom) => {
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
        })}
      </div>
      <TabBar />
    </>
  );
}

export default ChatPage;
