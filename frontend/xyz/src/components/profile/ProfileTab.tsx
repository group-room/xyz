"use client";

import React, { useState } from "react";
import Image from "next/image";
import MyroomIcon from "../../../public/icons/home.svg";
import Visitor from "../../../public/icons/reciept.svg";
import Guestbook from "./Guestbook";
import { useUserList } from "@/hooks/queries/user";
import GuestbookWrite from "./GuestbookWrite";
import MyPhotoMain from "./MyPhotoMain";
import { useAppSelector } from "@/hooks/redux";

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
  const state = useAppSelector((state) => state);
  const userSeq = state.auth.userInfo?.userSeq;
  const profileTabUserSeqToNumber = +profileTabUserSeq;

  const handleChange = (v: boolean) => {
    onChange(v);
  };

  function SelectedContent() {
    if (isClick) {
      return (
        <div>
          <MyPhotoMain userSeq={profileTabUserSeq} />
        </div>
      );
    } else {
      return (
        <div>
          {isFriend === true ? (
            <div>
              <Guestbook userSeq={profileTabUserSeq} />
              <GuestbookWrite userSeq={profileTabUserSeq} />
            </div>
          ) : (
            <div className="bg-pink text-white">
              {profileTabUserSeqToNumber !== userSeq ? (
                <div className="border-black border-x border-b p-1">
                  <Guestbook userSeq={profileTabUserSeq} /> 친구가 아니면
                  방명록을 남길 수 없습니다...
                </div>
              ) : (
                <div className="border-black border-x border-b p-1">
                  <Guestbook userSeq={profileTabUserSeq} />
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
  }

  return (
    <>
      <div className="flex border-t border-l border-r border-black rounded-t-md h-10">
        <div
          className={`flex w-1/2 items-center justify-center border-r border-black ${
            isClick ? " " : "border-b bg-neutral-300"
          }`}
          onClick={() => {
            setIsClick(true);
            handleChange(true);
          }}
        >
          <div className="mr-2">
            <Image src={MyroomIcon} alt="이미지" width={20} height={20} />
          </div>
          대문사진
        </div>
        <div
          className={`flex w-1/2 items-center justify-center border-black  ${
            !isClick
              ? "bg-pink text-white"
              : "border-b bg-neutral-300 text-white"
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
      <div>
        <SelectedContent />
      </div>
    </>
  );
}

export default ProfileTab;
