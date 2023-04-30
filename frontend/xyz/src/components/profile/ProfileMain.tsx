"use client";
import Textbox from "../Textbox";
import Image from "next/image";
import React from "react";

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
          <Textbox
            icon="/icons/edit.svg"
            alt="pretty"
            text="수식어"
            maintext="나를 수식할수"
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
    </div>
  );
}

export default ProfileMain;
