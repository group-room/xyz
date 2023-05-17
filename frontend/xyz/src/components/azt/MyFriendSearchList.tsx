import React from "react";
import MyFriendBox from "./MyFriendBox";
import { FriendListTypes } from "@/types/friend";
import { UserTypes } from "@/types/user";
import LoadingLottie from "../lottie/Loading";
import NotResultLottie from "../lottie/NotResult";

interface MyFriendSearchListProps {
  searchList: FriendListTypes[];
  aztMembers: UserTypes[];
  setAztMembers: React.Dispatch<React.SetStateAction<UserTypes[]>>;
  handleClickMemberInvite: (
    nickname: string,
    profileImage: string,
    userSeq: number
  ) => void;
}

function MyFriendSearchList({
  searchList,
  aztMembers,
  setAztMembers,
  handleClickMemberInvite,
}: MyFriendSearchListProps) {
  return (
    <div>
      <div className="text-lg mb-2">검색된 유저</div>
      <hr className="border-1 border-black mb-4"></hr>
      {searchList ? (
        searchList?.length > 0 ? (
          searchList.map(({ identify, profileImage, nickname, userSeq }) => {
            return (
              <MyFriendBox
                aztMembers={aztMembers}
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
          <div className="text-center">
            <p className="p-5">
              <NotResultLottie /> 검색된 유저가 없어요 ㅠㅠ
            </p>
          </div>
        )
      ) : (
        <div>
          <LoadingLottie />
        </div>
      )}
    </div>
  );
}

export default MyFriendSearchList;
