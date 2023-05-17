"use client";

import React, { useState } from "react";
import Btn from "./../../components/common/Btn";
import Notification from "./../../components/common/Notification";

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

  return (
    <div>
      <div className="flex justify-center items-center w-full space-x-3">
        {arr.map((list, idx) => (
          <Btn
            key={idx}
            width="w-[20vw]"
            bgColor="bg-white"
            text={list.name}
            btnFunc={list.func}
            className="hover:bg-pink"
          />
        ))}
      </div>

      <Notification type={type} />
    </div>
  );
}
