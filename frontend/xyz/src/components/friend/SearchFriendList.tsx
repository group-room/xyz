"use client";

import React from "react";
import { useAllSearch } from "@/hooks/queries/friend";
import FriendBox from "./FriendBox";

interface Props {
  check: boolean;
  keyword: string;
}

export default function SearchFriendList({ check, keyword }: Props) {
  const { data: searchList, isLoading } = useAllSearch(check, keyword);

  if (searchList) {
    console.log(searchList);
  }

  return (
    <div>
      <div className="text-lg mb-2">검색된 유저</div>
      <hr className="border-1 border-black mb-4"></hr>
      {searchList ? (
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
        <div>로딩중</div>
      )}
    </div>
  );
}
