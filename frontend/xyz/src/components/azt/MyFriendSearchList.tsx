import React from "react";
import MyFriendBox from "./MyFriendBox";
import { FriendListTypes } from "@/types/friend";
import { UserTypes } from "@/types/user";

interface MyFriendSearchListProps {
  searchList: FriendListTypes[];
  setAztMembers: React.Dispatch<React.SetStateAction<UserTypes[]>>;
}

function MyFriendSearchList({
  searchList,
  setAztMembers,
}: MyFriendSearchListProps) {
  if (searchList) console.log(searchList);
  const handleClickInvite = () => {
    setAztMembers((prev) => [...prev]);
  };

  return (
    <div>
      <div className="text-lg mb-2">검색된 유저</div>
      <hr className="border-1 border-black mb-4"></hr>
      {searchList ? (
        searchList.map((list) => {
          return (
            <MyFriendBox
              key={list.identify}
              imgSrc={list.profileImage}
              nickname={list.nickname}
              identify={list.identify}
              userSeq={list.userSeq}
              handleClickInvite={handleClickInvite}
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
