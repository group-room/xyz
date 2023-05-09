"use client";

import React, { useState } from "react";
import SearchBar from "../common/SearchBar";
import MyFriendList from "./MyFriendList";
import MyFriendSearchList from "./MyFriendSearchList";
import { useFriendSearch } from "@/hooks/queries/friend";
import { UserTypes } from "@/types/user";

type MyFriendSearchAreaProps = {
  slug: number;
  setAztMembers: React.Dispatch<React.SetStateAction<UserTypes[]>>;
};

function MyFriendSearchArea({ slug, setAztMembers }: MyFriendSearchAreaProps) {
  // true : 닉네임 검색, false : 고유 코드 검색
  const [check, setCheck] = useState(true);
  const [keyword, setKeyword] = useState("");
  const { data: searchList, isLoading } = useFriendSearch(check, keyword);

  return (
    <div>
      <div>
        <div className="font-semibold text-xl mb-4">친구 추가하기</div>
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
          <MyFriendList slug={slug} />
        ) : searchList ? (
          searchList.length > 0 ? (
            <MyFriendSearchList
              searchList={searchList}
              setAztMembers={setAztMembers}
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
