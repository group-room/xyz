"use client";

import { sendChat } from "@/app/api/chatting";
import ChatInput from "@/components/chatting/ChatInput";
import { queryKeys } from "@/constants/queryKeys";
import {
  useChattingDetail,
  useChattingHistory,
} from "@/hooks/queries/chatting";
import { useAppSelector } from "@/hooks/redux";
import useInput from "@/hooks/useInput";
import { SlugProps } from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

function ChattingRoomPage({ params: { slug } }: SlugProps) {
  const [chatInput, onChangeChatInput, resetInputValue] = useInput("");
  const loggedInUserSeq = useAppSelector(
    (state) => state.auth.userInfo?.userSeq
  );

  // 채팅방 정보 조회
  const { data: chatroomDetailData } = useChattingDetail(slug);
  if (chatroomDetailData) console.log(chatroomDetailData);

  // 채팅 기록 조회 - GET
  const chatroomSeq = slug.toString();
  const { data: chatHistory, isLoading } = useChattingHistory(chatroomSeq);
  if (chatHistory) console.log(chatHistory);

  // 채팅 실시간 조회 - SSE
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

  // 채팅 전송
  const queryClient = useQueryClient();
  const useSendChatMutation = useMutation({
    mutationFn: () =>
      sendChat(chatroomSeq, loggedInUserSeq!.toString(), chatInput),
    onSuccess: () => {
      console.log("성공");
      queryClient.invalidateQueries(
        queryKeys.chatting.chatHistory(chatroomSeq)
      );
      resetInputValue();
    },
  });

  const handleSumbitChat = () => {
    if (chatInput.length < 1) {
      alert("채팅을 입력해주세요");
      return;
    }
    useSendChatMutation.mutate();
  };

  return (
    <ChatInput
      chatInput={chatInput}
      onChangeChatInput={onChangeChatInput}
      handleSumbitChat={handleSumbitChat}
    />
  );
}

export default ChattingRoomPage;
