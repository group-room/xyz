"use client";

import React, { useState } from "react";
import Image from "next/image";
import Modal from "../common/Modal";
import AbleTimecaplsuleModal from "./AbleTimecaplsuleModal";

export default function TimecapsuleMachine() {
  const [isModal, setIsModal] = useState(false);

  const handleClick = () => {
    setIsModal(true);
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4">
          <Image
            src="/images/machine.svg"
            alt="machine"
            width="0"
            height="0"
            className="w-full h-auto"
            priority
          />
        </div>
        <div onClick={handleClick}>
          <Image
            src="/images/capsule.svg"
            alt="capsule"
            width="0"
            height="0"
            className="w-full h-auto"
          />
        </div>
        {/* 캡슐 잠김 여부에 따라  AbleTimecaplsuleModal or UnAbleTimecaplsuleModal*/}
        {isModal && (
          <Modal closeModal={() => setIsModal(false)}>
            <AbleTimecaplsuleModal />
          </Modal>
        )}
      </div>
    </div>
  );
}
