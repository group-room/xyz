import React from "react";
import ProfileImg from "../common/ProfileImg";

type MyFriendBoxProps = {
  imgSrc: string;
  nickname: string;
  identify: string;
  userSeq: number;
  handleClickInvite: (e: React.MouseEvent) => void;
};

function MyFriendBox({
  imgSrc,
  nickname,
  identify,
  handleClickInvite,
}: MyFriendBoxProps) {
  return (
    <div className="flex items-center">
      <div className="basis-1/4">
        <ProfileImg imgSrc={imgSrc} />
      </div>

      <div className="basis-2/4 flex flex-col ml-4">
        <div>{nickname}</div>
        <div>{identify}</div>
      </div>
      <div
        className="basis-1/4 flex items-center justify-center border-2 border-black w-20 h-10 bg-pink board-2 rounded-md cursor-pointer"
        onClick={(e) => handleClickInvite(e)}
      >
        초대하기
      </div>
    </div>
  );
}

export default MyFriendBox;
