"use client";

import { sendChat } from "@/app/api/chatting";
import ChatBubble from "@/components/chatting/ChatBubble";
import ChatHeader from "@/components/chatting/ChatHeader";
import ChatInput from "@/components/chatting/ChatInput";
import LoadingLottie from "@/components/lottie/Loading";
import { queryKeys } from "@/constants/queryKeys";
import {
  useChattingDetail,
  useChattingHistory,
} from "@/hooks/queries/chatting";
import { useAppSelector } from "@/hooks/redux";
import useInput from "@/hooks/useInput";
import { ChatDataTypes } from "@/types/chatting";
import { SlugProps } from "@/types/common";
import { timerSwal } from "@/utils/swalUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { is } from "date-fns/locale";
import { useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

function ChattingRoomPage({ params: { slug } }: SlugProps) {
  const [chatInput, onChangeChatInput, resetInputValue] = useInput("");
  const [chatData, setChatData] = useState<ChatDataTypes[]>([]); // 채팅 메시지 데이터
  const loggedInUserSeq = useAppSelector(
    (state) => state.auth.userInfo?.userSeq
  );
  const chatDataRef = useRef() as React.MutableRefObject<HTMLDivElement>; // 바닥으로 스크롤 위한 Ref
  const isFirstRendered = useRef(true); // 처음 렌더링 여부
  const scrollToBottom = () => {
    if (chatDataRef.current) chatDataRef.current.scrollIntoView();
  };
  const router = useRouter();

  const [chatTopRef, inView] = useInView(); // 무한 스크롤 위한 Ref'

  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [lastId, setLastId] = useState<number | null>(null); // 마지막 페이지
  const [isLast, setIsLast] = useState<boolean>(false); // 마지막 페이지인지 여부

  // 채팅방 정보 조회
  const { data: chatroomDetailData } = useChattingDetail(slug);

  // 채팅 기록 조회 - GET
  const chatroomSeq = slug.toString();
  const {
    data: chatHistoryData,
    fetchPreviousPage,
    hasPreviousPage,
    isFetchingPreviousPage,
  } = useChattingHistory(chatroomSeq, lastId);

  // 채팅방에 속한 유저 아닐 시 채팅방 목록으로 이동
  useLayoutEffect(() => {
    if (
      chatroomDetailData &&
      chatroomDetailData.members.find(
        (member) => member.userSeq === loggedInUserSeq
      ) === undefined
    ) {
      router.push("/chatting");
    }
  }, []);

  // 처음 페이지 진입시 스크롤 최하단으로 이동
  useEffect(() => {
    if (isFirstRendered.current) {
      scrollToBottom();
      isFirstRendered.current = false;
    }
  }, []);

  useEffect(() => {
    console.log(chatHistoryData, hasPreviousPage);

    if (inView && hasPreviousPage && !isFetchingPreviousPage) {
      console.log("상단 스크롤");
      fetchPreviousPage();
    }
    //   if (
    //     !isLast &&
    //     inView &&
    //     chatHistoryData &&
    //     chatHistoryData.pages[0].result.length > 0
    //   ) {
    //     setChatData(chatHistoryData.pages[0].result);
    //     setLastId(chatHistoryData.pages[0].prevId);
    //     fetchPreviousPage();
    //   } else {
    //     setIsLast(false);
    //   }
  }, [inView]);

  // 채팅 실시간 조회 - SSE
  useEffect(() => {
    const eventSource = new EventSource(
      `https://xyz-gen.com/chat/stream-sse?room=${slug}`
    );

    eventSource.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const sortedChatData = chatData
        .concat(message)
        .sort((a, b) => a.id - b.id);
      setChatData(sortedChatData);
    };

    return () => {
      eventSource.close();
    };
  }, [chatData]);

  // 채팅 전송
  const queryClient = useQueryClient();
  const useSendChatMutation = useMutation({
    mutationFn: () =>
      sendChat(chatroomSeq, loggedInUserSeq!.toString(), chatInput),
    onSuccess: () => {
      queryClient.invalidateQueries(
        queryKeys.chatting.chatHistory(chatroomSeq)
      );
      resetInputValue();
      scrollToBottom();
    },
  });

  const handleSumbitChat = () => {
    if (chatInput.length < 1) {
      timerSwal("채팅을 입력해주세요");
      return;
    }
    useSendChatMutation.mutate();
  };

  if (!chatroomDetailData)
    return (
      <div className="flex justify-center align-middle py-60">
        <LoadingLottie />
      </div>
    );

  if (chatroomDetailData && chatData) {
    const { name, type, aztSeq, userSeq, members } = chatroomDetailData;

    return (
      <div className="w-full">
        <ChatHeader
          name={name}
          type={type}
          userSeq={userSeq}
          aztSeq={aztSeq}
          count={members.length}
        />
        <div className="pt-14">
          <div ref={chatTopRef} />
          {chatHistoryData?.pages[0].result.map((chat, idx) => (
            <ChatBubble
              key={idx}
              chat={chat}
              members={members}
              isMine={chat.name === loggedInUserSeq?.toString()}
            />
          ))}
          <div ref={chatDataRef}></div>
        </div>
        <ChatInput
          chatInput={chatInput}
          onChangeChatInput={onChangeChatInput}
          handleSumbitChat={handleSumbitChat}
        />
      </div>
    );
  }
}

export default ChattingRoomPage;
