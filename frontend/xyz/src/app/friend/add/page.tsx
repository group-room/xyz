import React from "react";
import SearchBar from "@/components/common/SearchBar";
import ProfileImg from "@/components/common/ProfileImg";

export default function FriendAddPage() {
  return (
    <div>
      <div className="font-semibold text-xl mb-4">친구 추가하기</div>

      <div className="mb-2">
        <label className="mr-4">
          <input
            className="mr-2 accent-slate-600	"
            type="radio"
            name="search"
            value="search-nickname"
            checked
          />
          닉네임 검색
        </label>
        <label>
          <input
            className="mr-2 accent-slate-600"
            type="radio"
            name="search"
            value="search-code"
          />
          고유코드 검색
        </label>
      </div>

      <div className="mb-4">
        <SearchBar />
      </div>

      <div className="text-lg mb-2">내 친구 목록</div>
      <hr className="border-1 border-black mb-4"></hr>
      <div className="flex items-center w-full">
        <div className="basis-1/4">
          <ProfileImg imgSrc="/images/profileimg/queen.png" />
        </div>

        <div className="basis-2/4 flex flex-col ml-4">
          <div>㉠┤울공쥬☆</div>
          <div>#1004</div>
        </div>
        <div className="basis-1/4 flex items-center justify-center border-2 border-black w-20 h-10 bg-pink board-2 rounded-md">
          채팅
        </div>
      </div>
    </div>
  );
}
