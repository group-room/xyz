"use client";
import React, { useState, cloneElement, PropsWithChildren } from "react";
import Image from "next/image";
import ProfileEditImg from "../../../public/icons/profile-edit.svg";

function DropDown() {
  const [open, setOpen] = useState(false);
  const withdraw = () => {};
  const logout = () => {
    alert("로그아웃 되었습니다.");
  };
  const editProfile = () => {};
  return (
    <div className="dropdown relative w-24 ">
      <button
        className="text-center w-full py-1 focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        <Image src={ProfileEditImg} alt="프로필 수정" />
      </button>

      <ul
        className={`transform ${
          open ? `scale-y-100` : `scale-y-0`
        } transition duration-500 
          ease-in-out origin-top 
          w-full bg-white absolute text-black text-center border-2`}
        onClick={() => setOpen(!open)}
      >
        <li>
          <button className="py-1" onClick={editProfile}>
            프로필 수정
          </button>
        </li>
        <li>
          <button className="py-1" onClick={logout}>
            로그아웃
          </button>
        </li>
        <li>
          <button className="py-1" onClick={withdraw}>
            탈퇴하기
          </button>
        </li>
      </ul>
    </div>
  );
}

export default DropDown;
