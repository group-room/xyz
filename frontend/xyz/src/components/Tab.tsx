"use client";
import React from "react";
// import { useRouter } from "next/router";
import Link from "next/link";

function Tab() {
  const defaultClass =
    "flex-1 flex justify-center items-center px-3 py-0.5 bg-opacity-[0.78] text-[32px] whitespace-nowrap duration-[0.22s] ";
  // NavLink 활성 시 tailwind Class
  const activeClass = "bg-orange-500 text-white font-hopang-black";
  // NavLink 비활성 시 tailwind Class
  const inactiveClass =
    "border-orange-400 border-b-2 bg-white bg-opacity-80 text-orange-500 font-hopang-white ";

  //   const router = useRouter();

  return (
    <div className={`flex flex-nowrap sticky left-0 top-0 w-full`}>
      <Link href={"/profile"} className={defaultClass + inactiveClass}>
        학습 진행도
      </Link>
      <Link href={"/profile"} className={defaultClass + activeClass}>
        학습 진행도
      </Link>
    </div>
  );
}

export default Tab;
