"use client";
import Modal from "@/components/Modal";
import Tab from "@/components/Tab";
import Textbox from "@/components/Textbox";
import Btn from "@/components/common/Btn";
import React from "react";
import { useState } from "react";
import ProfileMain from "../../components/profile/ProfileMain";

function ProfilePage() {
  const [isModal, setIsModal] = useState(false);
  const buttonClick = () => {};

  const handleClick = () => {
    setIsModal(true);
  };
  return (
    <div className="w-full h-full">
      <div className={`box-content w-[90%] h-[35%] fixed bg-yellow -z-50`}>
        <ProfileMain />
      </div>
      {/* <div onClick={handleClick}> ProfilePage</div> */}
      {isModal && (
        <Modal closeModal={() => setIsModal(false)}>
          {<div>친구하실래요?</div>}
        </Modal>
      )}
      {/* <Textbox text="하이하이하이하이 이게너" /> */}
      {/* <div className="flex">
        <div className="ml-5 mr-10">
          <Btn width="full" bgColor="blue" text="친구" btnFunc={buttonClick} />
        </div>
        <div>
          <Btn width="full" bgColor="blue" text="친구" btnFunc={buttonClick} />
        </div>
      </div> */}

      {/* <Tab
        FirstLink="/profile/myroom"
        SecondLink="/profile/guestbook"
        FirstMenu="마이룸"
        SecondMenu="방명록"
      /> */}
    </div>
  );
}

export default ProfilePage;
