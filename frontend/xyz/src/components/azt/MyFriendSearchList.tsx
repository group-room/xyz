import React from "react";
import FriendBox from "../friend/FriendBox";
import { useFriendSearch } from "@/hooks/queries/friend";

interface Props {
  check: boolean;
  keyword: string;
}

function MyFriendSearchList({ check, keyword }: Props) {
  const { data: searchList, isLoading } = useFriendSearch(check, keyword);

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

export default MyFriendSearchList;
