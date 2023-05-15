"use client";

import { useChattingList } from "@/hooks/queries/chatting";
import React, { useEffect } from "react";

function ChatPage() {
  const { data: chatroomList, isLoading } = useChattingList();
  if (chatroomList) console.log(chatroomList);
  // useEffect(() => {
  //   const eventSource = new EventSource("https://xyz-gen.com/chat/message");

  //   eventSource.onmessage = (event) => {
  //     const message = JSON.parse(event.data);
  //     // Handle the received message, e.g., update the chat state
  //   };

  //   return () => {
  //     eventSource.close();
  //   };
  // }, []);
  return <div>ChatPage</div>;
}

export default ChatPage;
