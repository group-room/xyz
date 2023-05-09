"use client";

import React, { useState } from "react";
import Btn from "./../../components/common/Btn";
import Notification from "./../../components/common/Notification";
import { useNotifiacationList } from "@/hooks/queries/notification";

type BtnType = {
  name: string;
  func: () => void;
};

export default function NotificationPage() {
  const [type, setType] = useState("ALL");

  const arr: BtnType[] = [
    {
      name: "전체",
      func: () => setType("ALL"),
    },
    {
      name: "마이룸",
      func: () => setType("MYROOM"),
    },
    {
      name: "친구",
      func: () => setType("FRIEND"),
    },
    {
      name: "추억",
      func: () => setType("MEMORY"),
    },
  ];

  const { data: notiList, isLoading } = useNotifiacationList(type);
  
  if (notiList) {
    console.log(notiList);
  }

  return (
    <div>
      <h2>Notification</h2>
      <div className="flex space-x-4">
        {arr.map((list, idx) => (
          <div className="" key={idx}>
            <Btn
              width="w-[75px]"
              bgColor="bg-white"
              text={list.name}
              btnFunc={list.func}
            />
          </div>
        ))}
      </div>

      <Notification />
    </div>
  );
}
