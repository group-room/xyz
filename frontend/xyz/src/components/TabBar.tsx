"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { API } from "@/constants/queryKeys";
import { LOCAL } from "@/constants/localUrl";
import { RandomBg } from "@/constants/style";
import { bgRandomNumber } from "@/utils/bgUtils";

function TabBar() {
  const pathname = usePathname();

  const textColorWhite = [5, 6, 7, 8, 9];
  const highlightColorNotPink = [2, 3];

  const isTextColorWhite = textColorWhite.some(
    (color) => bgRandomNumber === color
  );
  const highlightTextColor = highlightColorNotPink.some(
    (color) => bgRandomNumber === color
  )
    ? "text-fuchsia-500"
    : "text-pink";

  return (
    <div
      className={`fixed ${
        RandomBg[bgRandomNumber]
      } bg-no-repeat bg-cover flex items-center justify-evenly bottom-0 left-0 right-0 h-14 shadow-[0_-3px_20px_-20px_rgba(0,0,0,0.3)] z-50 ${
        isTextColorWhite ? "text-gray-200" : "text-black"
      }`}
    >
      <Link
        href={`/${API.memory}`}
        className={
          pathname.includes(`/${API.memory}`) ? highlightTextColor : ""
        }
      >
        추억
      </Link>
      <Link
        href={`/${LOCAL.capsule}`}
        className={
          pathname.includes(`/${LOCAL.capsule}`) ? highlightTextColor : ""
        }
      >
        캡슐
      </Link>
      <Link
        href={`/${API.azt}`}
        className={pathname.includes(`/${API.azt}`) ? highlightTextColor : ""}
      >
        아지트
      </Link>
      <Link
        href={`/${LOCAL.chatting}`}
        className={
          pathname.includes(`/${LOCAL.chatting}`) ? highlightTextColor : ""
        }
      >
        채팅
      </Link>
      <Link
        href={`/${LOCAL.profile}`}
        className={
          pathname.includes(`/${LOCAL.profile}`) ? highlightTextColor : ""
        }
      >
        프로필
      </Link>
    </div>
  );
}

export default TabBar;
