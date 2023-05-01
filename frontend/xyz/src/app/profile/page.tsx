"use client";
import Modal from "@/components/Modal";
import Tab from "@/components/Tab";
import Textbox from "@/components/Textbox";
import Btn from "@/components/common/Btn";
import { BgColors } from "@/constants/style";
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
      <div className={`box-content w-full h-full bg-yellow -z-50`}>
        <ProfileMain />
      </div>
      <div className="flex pt-5">
        <div>
          <Btn width="w-40" bgColor="blue" text="친 구" btnFunc={handleClick} />
        </div>
        <div className=" pl-7">
          <Btn
            width="w-40"
            bgColor="blue"
            text="나의 활동"
            btnFunc={buttonClick}
          />
        </div>
      </div>
      {/* <div onClick={handleClick}> ProfilePage</div> */}
      {isModal && (
        <Modal closeModal={() => setIsModal(false)}>
          {<div>친구하실래요?</div>}
        </Modal>
      )}
    </div>
  );
}

export default ProfilePage;
