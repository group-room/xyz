"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoImg from "../../public/images/logo.svg";
import ArrowLeft from "../../public/icons/arrow-left.svg";
import FriendIcon from "../../public/icons/user_plus.svg";
import NotiIcon from "../../public/icons/notification.svg";
import { useAppSelector } from "@/hooks/redux";
import { EventSourcePolyfill } from "event-source-polyfill";
import { usePathname, useRouter } from "next/navigation";
import { API } from "@/constants/queryKeys";
import { LOCAL } from "@/constants/localUrl";
import { useUnreadNotifiacation } from "@/hooks/queries/notification";
import { bgRandomNumber } from "@/utils/bgUtils";
import { RandomBg } from "@/constants/style";

function Header() {
  const pathname = usePathname();
  const currPathname = pathname.slice(1, pathname.length);
  const router = useRouter();
  const mainPathnameWithLogo = [
    API.memory,
    LOCAL.capsule,
    API.azt,
    LOCAL.chatting,
    LOCAL.profile,
  ];

  const [isAlert, setIsAlert] = useState(false);
  const { data: isUnreadNotification, isLoading } = useUnreadNotifiacation();
  const accessToken: string = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    // 미확인 알람 유무 확인
    if (isUnreadNotification) {
      setIsAlert(true);
      return;
    }

    if (accessToken) {
      const eventSource = new EventSourcePolyfill(
        "https://xyz-gen.com/backend/api/connect",
        {
          headers: {
            Authorization: accessToken,
            "Content-Type": "text/event-stream;charset=UTF-8",
          },
          withCredentials: true,
        }
      );

      const fetchSse = async () => {
        try {
          eventSource.addEventListener("newNotification", (event: any) => {
            setIsAlert(true);
          });

          //sse 에러
          eventSource.onerror = () => {
            if (eventSource !== undefined) {
              eventSource.close();
            }
          };
        } catch (error) {
          // console.log(error);
        }
      };
      fetchSse();
      return () => eventSource.close();
    }
  });

  return (
    <header>
      <nav
        className={`fixed ${RandomBg[bgRandomNumber]} bg-no-repeat bg-cover flex items-center justify-between top-0 left-0 right-0 bg-white/8 px-5 py-4 shadow-sm shadow-slate-50 h-14 z-50`}
      >
        {mainPathnameWithLogo.find((path) => path === currPathname) ? (
          <Link href={"/memory"}>
            <Image
              src={LogoImg}
              alt="xyz 로고"
              width="0"
              height="0"
              className="w-[80px] h-[24px]"
            />
          </Link>
        ) : (
          <div onClick={() => router.back()} className="cursor-pointer">
            <Image src={ArrowLeft} alt="xyz 로고" width={13} height={13} />
          </div>
        )}
        <div className="flex gap-x-4">
          <Link href={"/friend"}>
            <Image src={FriendIcon} alt="xyz 로고" width={24} />
          </Link>
          <Link href={"/notification"} className="flex">
            {isAlert && (
              <div className="bg-red-500 rounded-full w-1 h-1 mr-[1px]"></div>
            )}
            <Image src={NotiIcon} alt="xyz 로고" width={20} />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
