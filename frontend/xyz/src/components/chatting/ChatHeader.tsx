import { LOCAL } from "@/constants/localUrl";
import { API } from "@/constants/queryKeys";
import { ChatBasicTypes } from "@/types/chatting";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ChatHeaderProps extends ChatBasicTypes {
  count: number;
}

function ChatHeader({ name, type, userSeq, aztSeq, count }: ChatHeaderProps) {
  const AztHeader = () => {
    return (
      <>
        <div className="flex gap-x-[3px] items-baseline bg-yellow px-4 py-3">
          <Image
            src="/icons/users.svg"
            alt="아지트 아이콘"
            width={13}
            height={15}
          />
          <span>{count}</span>
        </div>
        <div className="flex-auto flex items-center px-2 border-l border-r border-black">
          <p>{name.length > 12 ? name.slice(0, 12) + "..." : name}</p>
        </div>
        <div className="flex items-center bg-yellow px-4">
          <Link href={`${API.azt}/${aztSeq}`}>
            <Image src="/icons/folder.svg" alt="" width={25} height={15} />
          </Link>
        </div>
      </>
    );
  };

  const UserHeader = () => {
    return (
      <>
        <div className="flex gap-x-[3px] items-baseline bg-yellow p-4">
          <Image
            src="/icons/user.svg"
            alt="유저 아이콘"
            width={13}
            height={15}
          />
        </div>
        <div className="flex-auto flex items-center px-2 border-l border-r border-black">
          <p>{name.length > 12 ? name.slice(0, 12) + "..." : name}</p>
        </div>
        <div className="flex items-center bg-yellow px-2">
          <Link href={`${LOCAL.profile}/${userSeq}`}>프로필</Link>
        </div>
      </>
    );
  };

  return (
    <div className="flex border-t border-b border-black fixed top-[57px] w-full -ml-5">
      {type === "azt" ? <AztHeader /> : <UserHeader />}
    </div>
  );
}

export default ChatHeader;
