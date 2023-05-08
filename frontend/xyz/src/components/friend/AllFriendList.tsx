"use client";
import React from "react";
import { useFriendList } from "@/hooks/queries/friend";
import ProfileImg from "@/components/common/ProfileImg";

export default function AllFriendList() {
  const { data: friendList, isLoading: isFriendListLoading } = useFriendList();

  return (
    <div>
      <div className="text-lg mb-2">내 친구 목록</div>
      <hr className="border-1 border-black mb-4"></hr>
      {friendList ? (
        friendList.map((list, idx) => {
          return (
            <div key={idx} className="flex items-center w-full">
              <div className="basis-1/4">
                <ProfileImg imgSrc={list.profileImage} />
              </div>

              <div className="basis-2/4 flex flex-col ml-4">
                <div>{list.nickname}</div>
                <div>{list.identify}</div>
              </div>
              <div className="basis-1/4 flex items-center justify-center border-2 border-black w-20 h-10 bg-pink board-2 rounded-md">
                채팅
              </div>
            </div>
          );
        })
      ) : (
        <div>로딩중</div>
      )}
    </div>
  );
}
