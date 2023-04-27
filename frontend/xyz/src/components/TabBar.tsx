import React from "react";
import Link from "next/link";

function TabBar() {
  return (
    <div className="fixed flex items-center justify-evenly bottom-0 left-0 right-0 h-14 bg-white shadow-[0_-3px_20px_-20px_rgba(0,0,0,0.3)] z-50">
      <Link href={"/memory"}>추억</Link>
      <Link href={"/capsule"}>캡슐</Link>
      <Link href={"/azit"}>아지트</Link>
      <Link href={"/chat"}>채팅</Link>
      <Link href={"/profile"}>프로필</Link>
    </div>
  );
}

export default TabBar;
