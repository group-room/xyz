"use client";
import Modal from "@/components/common/Modal";
import Tab from "@/components/common/Tab";
import Textbox from "@/components/common/Textbox";
import Btn from "@/components/common/Btn";
import { BgColors } from "@/constants/style";
import React from "react";
import { useState } from "react";
import { useUserList, useVisitorList } from "@/hooks/queries/user";
import ProfileEdit from "@/components/profile/ProfileEdit";

function ProfilePage() {
  const [isModal, setIsModal] = useState(false);
  const buttonClick = () => {};

  const handleClick = () => {
    setIsModal(true);
  };

  const { data: userList, isLoading: isUserLoading, error } = useUserList(1);
  // 나중에 state 에서 userSeq 가져와서 넣을 자리 : useUserList(userSeq)
  if (!isUserLoading && userList) {
    console.log(userList, "userList");
  }

  const { data: visitorList, isLoading: isVisitorLoading } = useVisitorList(1);
  if (!isVisitorLoading && visitorList) {
    console.log(visitorList, "visitorList");
  }

  return (
    <div>
      {!userList ? "로딩중..." : <div>닉네임 {userList.nickname}</div>}
      {!userList ? "로딩중..." : <div>자기소개 {userList.introduce}</div>}

      {/* {!visitorList ? "로딩중..." : <div>방명록 {visitorList.map((idx))}</div>} */}
      <ProfileEdit />
    </div>
  );
}

export default ProfilePage;
