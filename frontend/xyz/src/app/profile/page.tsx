"use client";
import Modal from "@/components/common/Modal";
import Tab from "@/components/common/Tab";
import Textbox from "@/components/common/Textbox";
import Btn from "@/components/common/Btn";
import { BgColors } from "@/constants/style";
import React from "react";
import { useState } from "react";
import ProfileMain from "../../components/profile/ProfileMain";
import ProfileTab from "../../components/profile/ProfileTab";
import Guestbook from "@/components/profile/Guestbook";
import { useUserList, useVisitorList } from "@/hooks/queries/user";
import ProfileEdit from "@/components/profile/ProfileEdit";
import ProfilePhotoEdit from "@/components/profile/ProfilePhotoEdit";
import Myroom from "@/components/profile/Myroom";
import ProfileBtn from "@/components/profile/ProfileBtn";
import store from "@/store/store";

function ProfilePage() {
  //리덕스 정보 가져오기
  const state = store.getState();
  const userSeq = state.auth.userInfo?.userSeq;

  const [isModal, setIsModal] = useState(false);
  const buttonClick = () => {};

  const handleClick = () => {
    setIsModal(true);
  };

  const {
    data: userList,
    isLoading: isUserLoading,
    error,
  } = useUserList(userSeq);
  // 나중에 state 에서 userSeq 가져와서 넣을 자리 : useUserList(userSeq)
  if (!isUserLoading && userList) {
    console.log(userList, "userList");
  }

  const { data: visitorList, isLoading: isVisitorLoading } = useVisitorList(1);
  if (!isVisitorLoading && visitorList) {
    console.log(visitorList, "visitorList");
  }

  return (
    <div className="w-full h-full">
      <ProfileMain userSeq={userSeq} />
      <div className="flex py-2 items-center justify-center">
        <ProfileBtn userSeq={userSeq} />
      </div>

      <ProfileTab value={true} onChange={() => {}} />
      <Myroom />
      {/* <Guestbook userSeq={userSeq} /> */}
    </div>
  );
}

export default ProfilePage;
