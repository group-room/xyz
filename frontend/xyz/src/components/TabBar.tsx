"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { API } from "@/constants/queryKeys";
import { LOCAL } from "@/constants/localUrl";

function TabBar() {
  const pathname = usePathname();

  return (
    <div className="fixed flex items-center justify-evenly bottom-0 left-0 right-0 h-14 bg-white shadow-[0_-3px_20px_-20px_rgba(0,0,0,0.3)] z-50">
      <Link
        href={`/${API.memory}`}
        className={pathname.includes(`/${API.memory}`) ? "text-pink" : ""}
      >
        추억
      </Link>
      <Link
        href={`/${LOCAL.capsule}`}
        className={pathname.includes(`/${LOCAL.capsule}`) ? "text-pink" : ""}
      >
        캡슐
      </Link>
      <Link
        href={`/${API.azt}`}
        className={pathname.includes(`/${API.azt}`) ? "text-pink" : ""}
      >
        아지트
      </Link>
      <Link
        href={`/${LOCAL.chatting}`}
        className={pathname.includes(`/${LOCAL.chatting}`) ? "text-pink" : ""}
      >
        채팅
      </Link>
      <Link
        href={`/${LOCAL.profile}`}
        className={pathname.includes(`/${LOCAL.profile}`) ? "text-pink" : ""}
      >
        프로필
      </Link>
    </div>
  );
}

export default TabBar;
