import React from "react";
import MyFriendBox from "./MyFriendBox";
import { FriendListTypes } from "@/types/friend";
import { UserTypes } from "@/types/user";

interface MyFriendSearchListProps {
  searchList: FriendListTypes[];
  setAztMembers: React.Dispatch<React.SetStateAction<UserTypes[]>>;
  handleClickMemberInvite: (
    nickname: string,
    profileImage: string,
    userSeq: number
  ) => void;
}

function MyFriendSearchList({
  searchList,
  setAztMembers,
  handleClickMemberInvite,
}: MyFriendSearchListProps) {
  return (
    <div>
      <div className="text-lg mb-2">검색된 유저</div>
      <hr className="border-1 border-black mb-4"></hr>
      {searchList ? (
        searchList.map(({ identify, profileImage, nickname, userSeq }) => {
          return (
            <MyFriendBox
              key={identify}
              imgSrc={profileImage}
              nickname={nickname}
              identify={identify}
              userSeq={userSeq}
              handleClickMemberInvite={() =>
                handleClickMemberInvite(nickname, profileImage, userSeq)
              }
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
