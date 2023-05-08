"use client";
import Textbox from "../common/Textbox";
import Image from "next/image";
import React from "react";
import ProfileDropdown from "./ProfileDropdown";

function ProfileMain() {
  return (
    <div>
      <div className="flex flex-row">
        <div className="mt-2 ml-2">
          <Image
            src="/images/profileimg/queen.jpg"
            width={124}
            height={181}
            alt="example"
          />
        </div>
        <div>
          {/* <ProfileDropdown  /> */}
          <Textbox
            icon="/icons/edit.svg"
            alt="pretty"
            text="수식어"
            maintext="나를 수식할수없"
          />
          <Textbox
            icon="/icons/avatar.svg"
            alt="nickname"
            text="닉네임"
            maintext="지대퀸카"
          />
          <Textbox
            icon="/icons/user.svg"
            alt="visitor"
            text="방문자"
            maintext="30289"
          />
        </div>
      </div>
      <div className="border-2 border-black m-2 h-[92px] shadow-lg pb-2">
        <div className="border-black border-b-2">자기소개 한 마디</div>
        <div className="">사랑이란 마법을 믿어볼래</div>
      </div>
    </div>
  );
}

export default ProfileMain;
