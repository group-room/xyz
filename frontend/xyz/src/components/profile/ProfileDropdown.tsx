"use client";
import React, { useState, cloneElement, PropsWithChildren } from "react";
import Image from "next/image";
import ProfileEditImg from "../../../public/icons/profile-edit.svg";

interface ProfileDropDownProps {
  firstText: string;
  secondText?: string;
  thirdText?: string;
  firstFunc: () => void;
  secondFunc?: () => void;
  thirdFunc?: () => void;
}

function ProfileDropDown({
  firstText,
  secondText,
  thirdText,
  firstFunc,
  secondFunc,
  thirdFunc,
}: ProfileDropDownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown relative w-24">
      <button
        className="text-center w-full py-1 focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        <Image
          src={ProfileEditImg}
          alt="프로필 수정"
          className=" justify-end justify-items-end float-right"
        />
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
          <button className="py-1" onClick={firstFunc}>
            {firstText}
          </button>
        </li>
        {secondText && (
          <li>
            <button className="py-1" onClick={secondFunc}>
              {secondText}
            </button>
          </li>
        )}
        {thirdText && (
          <li>
            <button className="py-1" onClick={thirdFunc}>
              {thirdText}
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default ProfileDropDown;
