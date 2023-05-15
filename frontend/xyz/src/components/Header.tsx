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
const EventSource = require("eventsource");

function Header() {
  const [isAlert, setIsAlert] = useState(false);
  const accessToken: string = useAppSelector((state) => state.auth.accessToken);

  // Server Sent Event 로 가져온 data 를 화면에 보여주기 위한 state 변수
  const [sseDate, setSseDate] = useState();
  const [sseHeader, setSseHeader] = useState();

  useEffect(() => {
    // EventSource 로 Server Sent Event 를 호출하는 부분
    const eventSource = new EventSource(
      "https://xyz-gen.com/backend/api/connect",
      {
        headers: {
          Authorization: accessToken,
        },
        withCredentials: true,
      }
    );

    // EventSource 로 data 를 받아서 처리하는 event listener 설정
    eventSource.addEventListener("connect", async function (event: any) {
      const data = JSON.parse(event.data);
      setSseHeader(data["auth-user"]);
      setSseDate(data["date"]);
    });

    // Server Sent Event 가 종료되는 경우 연결된 EventSource 를 close 하는 부분
    eventSource.addEventListener("close", () => eventSource.close());
    return () => eventSource.close();
  }, []);

  // const EventSource = EventSourcePolyfill || NativeEventSource;

  // useEffect(() => {
  //   const eventSource = new EventSource(
  //     `https://xyz-gen.com/backend/api/connect`,
  //     {
  //       headers: {
  //         Authorization: accessToken,
  //       },
  //       heartbeatTimeout: 30000,
  //       withCredentials: true,
  //     }
  //   );

  //     eventSource.addEventListener("connect", function(event) {
  //       console.log("connect")
  //   })

  //     eventSource.addEventListener("newNotification", function(event) {
  //       console.log("newNotification")
  //   })

  //   // if (accessToken) {
  //   //   console.log("토큰이 있음");
  //   //   const fetchSse = async () => {
  //   //     console.log("fetchSse 안에 들어옴");
  //   //     try {
  //   //       console.log("try 안에 들어옴");

  //   //       eventSource.addEventListener("open", (e) => {
  //   //         console.log("The connection has been established.");
  //   //       });

  //   //       /* EVENTSOURCE ONMESSAGE ---------------------------------------------------- */
  //   //       eventSource.onmessage = async (event) => {
  //   //         console.log("연결전");
  //   //         const res = await event.data;
  //   //         setIsAlert(true);
  //   //         console.log("연결됨!!!!!!!!!!!!!!!!!!!");
  //   //       };
  //   //     } catch (error) {
  //   //       console.log(error);
  //   //     }
  //   //   };
  //   //   fetchSse();
  //   //   return () => eventSource.close();
  //   // }
  // });

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
