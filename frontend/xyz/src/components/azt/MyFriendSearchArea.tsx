"use client";

import React, { useState } from "react";
import SearchBar from "../common/SearchBar";
import MyFriendList from "./MyFriendList";
import MyFriendSearchList from "./MyFriendSearchList";
import { useFriendSearch } from "@/hooks/queries/friend";
import { UserTypes } from "@/types/user";
import Btn from "../common/Btn";
import ProfileImg from "../common/ProfileImg";

type MyFriendSearchAreaProps = {
  slug: number;
  aztMembers: UserTypes[];
  setAztMembers: React.Dispatch<React.SetStateAction<UserTypes[]>>;
  setIsFriendInviteOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function MyFriendSearchArea({
  slug,
  aztMembers,
  setAztMembers,
  setIsFriendInviteOpen,
}: MyFriendSearchAreaProps) {
  // true : 닉네임 검색, false : 고유 코드 검색
  const [check, setCheck] = useState(true);
  const [keyword, setKeyword] = useState("");
  const { data: searchList, isLoading } = useFriendSearch(check, keyword);
  const handleClickMemberInvite = (
    nickname: string,
    profileImage: string,
    userSeq: number
  ) => {
    if (aztMembers.find((member) => member.userSeq === userSeq)) {
      setAztMembers((prev) =>
        prev.filter((member) => member.userSeq !== userSeq)
      );
    } else {
      setAztMembers((prev) => [...prev, { nickname, profileImage, userSeq }]);
    }
  };

  return (
    <div>
      <div>
        <div className="flex justify-between">
          <p className="font-semibold text-xl mb-4">친구 추가하기</p>
          <Btn
            bgColor="blue"
            text="추가 완료"
            btnFunc={() => setIsFriendInviteOpen(false)}
          />
        </div>
        <div className="grid grid-cols-4 my-5">
          {aztMembers.map((member) => {
            return (
              <div
                key={member.userSeq}
                className="basis-1/4 flex-none text-center items-center"
              >
                <ProfileImg imgSrc={member.profileImage} />
                <p className="text-sm mt-1">{member.nickname}</p>
              </div>
            );
          })}
        </div>
        <div className="mb-2">
          <label className="mr-4">
            <input
              className="mr-2 accent-slate-600	"
              type="radio"
              name="search"
              value=""
              defaultChecked
              onClick={() => setCheck(true)}
            />
            닉네임 검색
          </label>
          <label>
            <input
              className="mr-2 accent-slate-600"
              type="radio"
              name="search"
              value=""
              onClick={() => setCheck(false)}
            />
            고유코드 검색
          </label>
        </div>

        <div className="mb-4">
          <SearchBar keyword={keyword} setKeyword={setKeyword} />
        </div>
        {keyword === "" || keyword === undefined || keyword === null ? (
          <MyFriendList
            slug={slug}
            handleClickMemberInvite={handleClickMemberInvite}
          />
        ) : searchList ? (
          searchList.length > 0 ? (
            <MyFriendSearchList
              searchList={searchList}
              setAztMembers={setAztMembers}
              handleClickMemberInvite={handleClickMemberInvite}
            />
          ) : (
            <p>검색결과가 없어요 ㅠㅠ</p>
          )
        ) : (
          <p>검색중..</p>
        )}
      </div>
    </div>
  );
}

export default MyFriendSearchArea;
