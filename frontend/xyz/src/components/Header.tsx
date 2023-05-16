"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoImg from "../../public/images/logo.svg";
import FriendIcon from "../../public/icons/user_plus.svg";
import NotiIcon from "../../public/icons/notification.svg";
import { useAppSelector } from "@/hooks/redux";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";

// 기본적으로 제공되는 eventsource 가 아닌 추가로 설치한 eventsource 를 사용
// const EventSource = require("eventsource");

function Header() {
  const [isAlert, setIsAlert] = useState(false);
  const accessToken: string = useAppSelector((state) => state.auth.accessToken);

  const EventSource = EventSourcePolyfill;

  useEffect(() => {
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
          //sse 최초 연결되었을 때
          eventSource.onopen = (event) => {
            console.log("open");
            console.log(event);
          };

          eventSource.addEventListener("connect", (event: any) => {
            console.log(event.data);
          });
          eventSource.addEventListener("newNotification", (event: any) => {
            console.log(event);
            setIsAlert(true);
          });

          //sse 에러
          eventSource.onerror = (event) => {
            console.log(event);
            if (eventSource !== undefined) {
              eventSource.close();
              console.log("연결 닫힘");
            }
          };
        } catch (error) {
          console.log(error);
        }
      };
      fetchSse();
      return () => eventSource.close();
    }
  });

  return (
    <header>
      <nav className="fixed flex items-center justify-between top-0 left-0 right-0 bg-white px-5 py-4 shadow-sm shadow-slate-50 h-14 z-50">
        <Link href={"/memory"}>
          <Image
            src={LogoImg}
            alt="xyz 로고"
            width="0"
            height="0"
            className="w-[80px] h-[24px]"
          />
        </Link>
        <div className="flex gap-x-4">
          <Link href={"/friend"}>
            <Image src={FriendIcon} alt="xyz 로고" width={24} />
          </Link>
          <Link href={"/notification"}>
            <div>
              {isAlert && <div className="bg-red-500 rounded-full"></div>}
              <Image src={NotiIcon} alt="xyz 로고" width={20} />
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
