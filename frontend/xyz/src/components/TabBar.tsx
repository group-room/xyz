"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function TabBar() {
  const pathname = usePathname();

  return (
    <div className="fixed flex items-center justify-evenly bottom-0 left-0 right-0 h-14 bg-white shadow-[0_-3px_20px_-20px_rgba(0,0,0,0.3)] z-50">
      <Link
        href={"/memory"}
        className={pathname.includes("/memory") ? "text-pink" : ""}
      >
        추억
      </Link>
      <Link
        href={"/capsule"}
        className={pathname.includes("/capsule") ? "text-pink" : ""}
      >
        캡슐
      </Link>
      <Link
        href={"/azt"}
        className={pathname.includes("/azt") ? "text-pink" : ""}
      >
        아지트
      </Link>
      <Link
        href={"/chat"}
        className={pathname.includes("/chat") ? "text-pink" : ""}
      >
        채팅
      </Link>
      <Link
        href={"/profile"}
        className={pathname.includes("/profile") ? "text-pink" : ""}
      >
        프로필
      </Link>
    </div>
  );
}

export default TabBar;
