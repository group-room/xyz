"use client";

import React, { useState } from "react";
import Image from "next/image";
import MyroomIcon from "../../../public/icons/home.svg";
import Visitor from "../../../public/icons/reciept.svg";
import Guestbook from "./Guestbook";

import { useUserList } from "@/hooks/queries/user";
import { is } from "date-fns/locale";
import GuestbookWrite from "./GuestbookWrite";
import MyPhotoMain from "./MyPhotoMain";

type ButtonProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  profileTabUserSeq: number;
};

function ProfileTab({ value, onChange, profileTabUserSeq }: ButtonProps) {
  const {
    data: userList,
    isLoading: isUserLoading,
    error,
  } = useUserList(profileTabUserSeq);
  const [isClick, setIsClick] = useState(true);
  const isFriend = userList?.friend;

  const handleChange = (v: boolean) => {
    onChange(v);
  };

  function SelectedContent() {
    if (isClick) {
      return (
        <div className="w-full h-full">
          <MyPhotoMain userSeq={profileTabUserSeq} />
        </div>
      );
    } else {
      return (
        <div className="w-full h-full">
          {isFriend === true ? (
            <div>
              <Guestbook userSeq={profileTabUserSeq} />
              <GuestbookWrite userSeq={profileTabUserSeq} />
            </div>
          ) : (
            <div className="bg-pink text-white">
              <Guestbook userSeq={profileTabUserSeq} /> 친구가 아니면 방명록을
              남길 수 없습니다...
            </div>
          )}
        </div>
      );
    }
  }

  return (
    <>
      <div className="flex border-t-2 border-l-2 border-r-2 border-black rounded-t-md h-10">
        <div
          className={`flex w-1/2 items-center justify-center border-r-2 border-black bg-yellow ${
            isClick ? "" : "border-b-2"
          }`}
          onClick={() => {
            setIsClick(true);
            handleChange(true);
          }}
        >
          <div className="mr-2">
            <Image src={MyroomIcon} alt="이미지" width={20} height={20} />
          </div>
          XYZ 대문사진
        </div>
        <div
          className={`flex w-1/2 items-center justify-center border-black bg-pink text-white ${
            !isClick ? "" : "border-b-2"
          }`}
          onClick={() => {
            setIsClick(false);
            handleChange(false);
          }}
        >
          <div className="mr-2">
            <Image src={Visitor} alt="이미지" width={20} height={20} />
          </div>
          방명록
        </div>
      </div>
      <div className="w-full h-full">
        <SelectedContent />
      </div>
    </>
  );
}

export default ProfileTab;
