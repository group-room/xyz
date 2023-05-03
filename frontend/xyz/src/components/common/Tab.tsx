"use client";
import React from "react";
import { PropsWithChildren } from "react";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface TabProps {
  FirstLink: string;
  SecondLink: string;
  FirstMenu: string;
  SecondMenu: string;
}

function Tab({
  FirstLink,
  SecondLink,
  FirstMenu,
  SecondMenu,
  children,
}: PropsWithChildren<TabProps>) {
  const router = useRouter();
  const pathname = usePathname();
  const defaultClass =
    "flex-1 flex justify-center items-center px-3 py-0.5 bg-opacity-[0.78] text-[32px] whitespace-nowrap duration-[0.22s] ";
  // Link 활성 시 tailwind Class
  const activeClass =
    "bg-white text-black text-base border-black border-l-2 border-t-2 border-r-2 pt-4 pb-2";
  // Link 비활성 시 tailwind Class
  const inactiveClass =
    "border-black border-b-2 bg-slate-300 text-black text-base pt-4 pb-2";

  return (
    <div className={`flex flex-nowrap left-0 top-0 w-full`}>
      <Link
        href={FirstLink}
        className={`${defaultClass} ${
          pathname === FirstLink ? activeClass : inactiveClass
        }`}
      >
        {FirstMenu}
      </Link>
      <Link
        href={SecondLink}
        className={`${defaultClass} ${
          pathname === SecondLink ? activeClass : inactiveClass
        }`}
      >
        {SecondMenu}
      </Link>
    </div>
  );
}

export default Tab;
