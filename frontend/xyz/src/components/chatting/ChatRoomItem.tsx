import React from "react";
import ProfileImg from "../common/ProfileImg";
import Image from "next/image";
import { LOCAL } from "@/constants/localUrl";
import { useRouter } from "next/navigation";
import { ChattingRoomListTypes } from "@/types/chatting";

function ChatRoomItem({ chatroom }: { chatroom: ChattingRoomListTypes }) {
  const { name, image, count, sequence } = chatroom;
  const router = useRouter();
  return (
    <div
      className="flex gap-x-4 mb-5 cursor-pointer"
      onClick={() => router.push(`/${LOCAL.chatting}/${sequence}`)}
    >
      <div className="flex-none">
        <ProfileImg imgSrc={image} />
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex gap-x-2 items-middle">
            <p>{name}</p>
            {count && (
              <div className="flex gap-x-[2px] items-middle">
                <Image
                  src="/icons/users.svg"
                  alt="아지트 아이콘"
                  width={13}
                  height={15}
                />
                <span>{count}</span>
              </div>
            )}
          </div>
          <p className="text-gray-300">1:21 PM</p>
        </div>
        <div>
          <p className="text-gray-400">최근 채팅 내용</p>
        </div>
      </div>
    </div>
  );
}

export default ChatRoomItem;
