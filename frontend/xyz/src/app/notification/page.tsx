'use client'

import React from "react";
import Btn from './../../components/common/Btn';
import Notification from './../../components/common/Notification';

type BtnType = {
  name: string;
  func: () => void;
}

function AllList() {
  console.log("AllList")
}

function MyroomList() {
  console.log("MyroomList")
}

function FriendList() {
  console.log("FriendList")
}

function MemoryList() {
  console.log("MemoryList")
}


export default function NotificationPage() {
  const arr: BtnType[] = [
    {
      name: "전체",
      func: AllList,
    },
    {
      name: "마이룸",
      func: MyroomList,
    },
    {
      name: "친구",
      func: FriendList,
    },
    {
      name: "추억",
      func: MemoryList,
    },
  ]
  
  return (
  <div>
    <h2>Notification</h2>
    <div className="flex space-x-4">
      {arr.map((list, idx) => 
      <div className="" key={idx}>
        <Btn width="w-[75px]" bgColor="bg-white" text={list.name} btnFunc={list.func} />
      </div>
      )}
    </div>

    <Notification />
  </div>
  );
}
