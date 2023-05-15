"use client";

import { sendChat } from "@/app/api/chatting";
import ChatInput from "@/components/chatting/ChatInput";
import { queryKeys } from "@/constants/queryKeys";
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
  const queryClient = useQueryClient();
  const useSendChatMutation = useMutation({
    mutationFn: () =>
      sendChat(slug.toString(), loggedInUserSeq!.toString(), chatInput),
    onSuccess: () => {
      console.log("성공");
      queryClient.invalidateQueries(
        queryKeys.chatting.chatDetail(slug.toString())
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
