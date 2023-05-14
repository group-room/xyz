"use client";

import React, { useState } from "react";
import Image from "next/image";
import MyroomIcon from "../../../public/icons/home.svg";
import Visitor from "../../../public/icons/reciept.svg";
import Guestbook from "./Guestbook";
import Myroom from "./Myroom";

type ButtonProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  profileTabUserSeq: number | string | undefined;
};

function ProfileTab({ value, onChange, profileTabUserSeq }: ButtonProps) {
  const [isClick, setIsClick] = useState(false);

  const handleChange = (v: boolean) => {
    onChange(v);
  };

  function SelectedContent() {
    if (isClick) {
      return (
        <div className="w-full h-full">
          <Myroom />
        </div>
      );
    } else {
      return (
        <div className="w-full h-full">
          {" "}
          <Guestbook userSeq={profileTabUserSeq} />{" "}
        </div>
      );
    }
  }

  return (
    <>
      <div className="flex border-t-2 border-l-2 border-r-2 border- border-black rounded-md h-10">
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
          마이룸
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
