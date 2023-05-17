"use client";

import React from "react";
import { useAllSearch } from "@/hooks/queries/friend";
import FriendBox from "./FriendBox";
import NotResultLottie from "../lottie/NotResult";

interface Props {
  check: boolean;
  keyword: string;
}

export default function SearchFriendList({ check, keyword }: Props) {
  const { data: searchList, isLoading } = useAllSearch(check, keyword);

  return (
    <div>
      <div className="text-lg mb-2">검색된 유저</div>
      <hr className="border-1 border-black mb-4"></hr>
      {searchList && searchList.length !== 0 ? (
        searchList.map((list) => {
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
        <div className="flex flex-col justify-center items-center mt-[10vh]">
          <NotResultLottie />
          <div className="mt-8"> 검색된 친구 리스트가 없습니다. </div>
        </div>
      )}
    </div>
  );
}
