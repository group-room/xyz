"use client";
import React from "react";
import { useFriendList } from "@/hooks/queries/friend";
import FriendBox from "./FriendBox";
import NotResultLottie from "../lottie/NotResult";
import { useRouter } from "next/navigation";

type Props = {
  isBlock: boolean;
};

export default function FriendList({ isBlock }: Props) {
  const router = useRouter();

  const { data: friendList, isLoading } = useFriendList(isBlock);
  if (friendList) {
    console.log(friendList);
  }
  return (
    <div>
      {isBlock ? (
        <div className="text-lg mb-2">차단한 목록</div>
      ) : (
        <div className="text-lg mb-2">내 친구 목록</div>
      )}
      <hr className="border-1 border-black mb-4"></hr>
      {friendList && friendList.length !== 0 ? (
        friendList.map((list) => {
          return (
            <FriendBox
              key={list.identify}
              imgSrc={list.profileImage}
              nickname={list.nickname}
              identify={list.identify}
              relation={list.relation as string}
              userSeq={list.userSeq}
              chatSeq={list.chatSeq}
            />
          );
        })
      ) : (
        <div className="flex flex-col justify-center items-center mt-[10vh]">
          <NotResultLottie width="90%" height="90%" />
          <div className="mt-8"> 친구 리스트가 없습니다. </div>
        </div>
      )}
    </div>
  );
}
