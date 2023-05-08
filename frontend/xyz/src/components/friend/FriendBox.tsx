import React from "react";
import ProfileImg from "@/components/common/ProfileImg";

type Props = {
  imgSrc: string;
  nickname: string;
  identify: string;
};

export default function FriendBox({ imgSrc, nickname, identify }: Props) {
  return (
    <div className="flex items-center">
      <div className="basis-1/4">
        <ProfileImg imgSrc={imgSrc} />
      </div>

      <div className="basis-2/4 flex flex-col ml-4">
        <div>{nickname}</div>
        <div>{identify}</div>
      </div>
      <div className="basis-1/4 flex items-center justify-center border-2 border-black w-20 h-10 bg-pink board-2 rounded-md">
        채팅
      </div>
    </div>
  );
}
