"use client";
import Modal from "@/components/common/Modal";
import Tab from "@/components/common/Tab";
import Textbox from "@/components/common/Textbox";
import Btn from "@/components/common/Btn";
import { BgColors } from "@/constants/style";
import React from "react";
import { useState } from "react";
import { useUserList, useVisitorList } from "@/hooks/queries/user";

function ProfilePage() {
  const [isModal, setIsModal] = useState(false);
  const buttonClick = () => {};

  const handleClick = () => {
    setIsModal(true);
  };

  const { data: userList, isLoading: isUserLoading, error } = useUserList();
  if (!isUserLoading && userList) {
    console.log(userList, "userList");
  }

  const { data: visitorList, isLoading: isVisitorLoading } = useVisitorList(1);
  if (!isVisitorLoading && visitorList) {
    console.log(visitorList, "visitorList");
  }

  return (
    <div>
      {/* {!userList ? "로딩중..." : <div>하이루 {userList.nickname}</div>} */}
      {/* {!visitorList ? "로딩중..." : <div>방명록 {visitorList.map((idx))}</div>} */}
    </div>
  );
}

export default ProfilePage;
