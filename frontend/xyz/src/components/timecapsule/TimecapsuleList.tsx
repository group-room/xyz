"use client";

import ProfileImg from "./../common/ProfileImg";
import Image from "next/image";
import Plus from "../../../public/icons/plus.svg";
import Link from "next/link";
import { useWaitingCapsuleList } from "@/hooks/queries/capsule";

export default function TimecapsuleList() {
  const { data: capsuleList, isLoading } = useWaitingCapsuleList(0);
  if (capsuleList) {
    console.log(capsuleList);
  }

  return (
    <div className="flex overflow-x-auto scrollbar-hide ">
      <Link href={"/capsule/create"}>
        <div className="relative flex flex-col items-center justify-center shrink-0 mr-2">
          <div className="flex items-center justify-center bg-pink rounded-full w-[65px] h-[65px]">
            <Image src={Plus} alt="btn" />
          </div>
          <div className="text-sm mt-2">캡슐생성</div>
        </div>
      </Link>
      <div className="flex flex-col items-center justify-center shrink-0 mr-2">
        <div className="absolute top-0 left-1">
          <Image src="/icons/lock-gray.svg" alt="icon" width={15} height={15} />
        </div>
        <ProfileImg imgSrc="/images/profileimg/queen.jpg" />
        <div>D-Day</div>
      </div>
      <div className="flex flex-col items-center justify-center shrink-0 mr-2">
        <ProfileImg imgSrc="/images/profileimg/queen.jpg" />
        <div>D-2</div>
      </div>
      <div className="flex flex-col items-center justify-center shrink-0 mr-2">
        <ProfileImg imgSrc="/images/profileimg/queen.jpg" />
        <div>D-3</div>
      </div>
      <div className="flex flex-col items-center justify-center shrink-0 mr-2">
        <ProfileImg imgSrc="/images/profileimg/queen.jpg" />
        <div>D-4</div>
      </div>
      <div className="flex flex-col items-center justify-center shrink-0 mr-2">
        <ProfileImg imgSrc="/images/profileimg/queen.jpg" />
        <div>D-5</div>
      </div>
      <div className="flex flex-col items-center justify-center shrink-0 mr-2">
        <ProfileImg imgSrc="/images/profileimg/queen.jpg" />
        <div>D-6</div>
      </div>
      <div className="flex flex-col items-center justify-center shrink-0 mr-2">
        <ProfileImg imgSrc="/images/profileimg/queen.jpg" />
        <div>D-7</div>
      </div>
      <div className="flex flex-col items-center justify-center shrink-0 mr-2">
        <ProfileImg imgSrc="/images/profileimg/queen.jpg" />
        <div>D-8</div>
      </div>
    </div>
  );
}
