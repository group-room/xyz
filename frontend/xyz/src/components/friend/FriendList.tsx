"use client";
import React from "react";
import { useFriendList } from "@/hooks/queries/friend";
import FriendBox from "./FriendBox";

type Props = {
  isBlock: boolean;
};

export default function FriendList({ isBlock }: Props) {
  const { data: friendList, isLoading } = useFriendList(isBlock);
  if (friendList) {
    console.log(isBlock);
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
      {friendList ? (
        friendList.map((list) => {
          return (
            <FriendBox
              key={list.identify}
              imgSrc={list.profileImage}
              nickname={list.nickname}
              identify={list.identify}
              relation={list.relation as string}
              userSeq={list.userSeq}
            />
          );
        })
      ) : (
        <div>로딩중</div>
      )}
    </div>
  );
}
