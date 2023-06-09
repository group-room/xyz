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
  const [name, setName] = useState("전체");
  const [activeButton, setActiveButton] = useState(0);

  const arr: BtnType[] = [
    {
      name: "전체",
      func: () => {
        setType("ALL");
        setActiveButton(0);
        setName("전체");
      },
    },
    {
      name: "친구",
      func: () => {
        setType("FRIEND");
        setActiveButton(1);
        setName("친구");
      },
    },
    {
      name: "추억",
      func: () => {
        setType("MEMORY");
        setActiveButton(2);
        setName("추억");
      },
    },
    {
      name: "프로필",
      func: () => {
        setType("MYROOM");
        setActiveButton(3);
        setName("프로필");
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-center items-center w-full space-x-3">
        {arr.map((list, idx) => (
          <Btn
            key={idx}
            width="w-1/4"
            bgColor={activeButton === idx ? "bg-pink" : "bg-white"}
            text={list.name}
            btnFunc={list.func}
            className={activeButton === idx ? "bg-pink" : ""}
          />
        ))}
      </div>

      <Notification type={type} name={name} />
    </div>
  );
}
