"use client";

import React, { useEffect, useState } from "react";
import SearchBar from "@/components/common/SearchBar";
import AllFriendList from "@/components/friend/AllFriendList";
import SearchFriendList from "@/components/friend/SearchFriendList";

export default function FriendPage() {
  // true : 닉네임 검색, false : 고유 코드 검색
  const [check, setCheck] = useState(true);
  const [keyword, setKeyword] = useState("");

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
          <AllFriendList />
        ) : (
          <SearchFriendList check={check} keyword={keyword} />
        )}
      </div>
    </div>
  );
}
