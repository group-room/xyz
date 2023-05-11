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
    <div className="w-full h-full">
      <div className={`box-content w-full h-full bg-yellow p-1`}>
        <ProfileMain userSeq="1" />
      </div>
      {/* <div className="flex pt-5">
        <div>
          <Btn width="w-40" bgColor="blue" text="친 구" btnFunc={buttonClick} />
        </div>
        <div className=" pl-7">
          <Btn
            width="w-40"
            bgColor="blue"
            text="나의 활동"
            btnFunc={buttonClick}
          />
        </div>
      </div> */}
      <ProfileBtn userSeq="1" />

      {/* {isModal && (
        <Modal closeModal={() => setIsModal(false)}>
          {<div>친구하실래요?</div>}
        </Modal>
      )} */}

      <ProfileTab value={true} onChange={() => {}} />
      {/* <Myroom /> */}
      <Guestbook />
    </div>
  );
}

export default ProfilePage;
