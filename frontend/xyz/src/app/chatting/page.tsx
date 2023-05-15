"use client";

import ChatRoomItem from "@/components/chatting/ChatRoomItem";
import { useChattingList } from "@/hooks/queries/chatting";
import React, { useEffect } from "react";

function ChatPage() {
  const { data: chatroomList, isLoading } = useChattingList();
  if (!chatroomList) {
    return <div>로딩중...</div>;
  }
  return (
    <div className="pt-2">
      {chatroomList.map((chatroom) => {
        return <ChatRoomItem key={chatroom.sequence} chatroom={chatroom} />;
      })}
    </div>
  );
}

export default ChatPage;
