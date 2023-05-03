"use client";
import Modal from "../../components/common/ModalBtn";
import Btn from "@/components/common/Btn";
import { BgColors } from "@/constants/style";
import React from "react";
import { useState } from "react";
import ProfileMain from "../../components/profile/ProfileMain";

function ProfilePage() {
  const [isModal, setIsModal] = useState(false);
  const buttonClick = () => {};
  const buttonYes = () => {
    alert("친구가 되었습니다.");
  };

  const handleClick = () => {
    setIsModal(true);
  };
  return (
    <div className="w-full h-full">
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

      <div onClick={handleClick}> ProfilePage</div>
      {isModal && (
        <Modal
          yesFunc={buttonYes}
          closeModal={() => setIsModal(false)}
          text="나랑 친구를 해볼래? 나랑 친구를 해볼래?"
        />
      )}
    </div>
  );
}

export default ProfilePage;
