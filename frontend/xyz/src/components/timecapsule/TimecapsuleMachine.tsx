"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TimecapsuleMachine() {
  const router = useRouter();

  const [isRandom, setIsRandom] = useState(false);
  const [isMoved, setIsMoved] = useState(false);
  const [isRotated, setIsRotated] = useState(false);

  const handleClick = () => {
    setIsRandom(true);
    router.push("/capsule/random");
  };

  const handleButtonClick = () => {
    setIsRotated(!isRotated);
    setTimeout(() => {
      setIsMoved(!isMoved);
    }, 1200);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4">
          <img src="/images/machine.png" alt="machine" />
          <img
            onClick={handleButtonClick}
            src="/images/button.png"
            alt="machine"
            className={`absolute w-20 h-20 bottom-80 left-16 ${
              isRotated ? "animate-spin-slow" : ""
            }`}
          />
        </div>
        <div onClick={handleClick} className="absolute bottom-32 right-28">
          {isMoved && (
            <Image
              src="/images/capsule.svg"
              alt="capsule"
              width="0"
              height="0"
              className={`w-full h-auto transition duration-500 transform ${
                isMoved ? "animate-fade-in-transform" : ""
              }`}
            />
          )}
        </div>

        {/* 캡슐 잠김 여부에 따라  AbleTimecaplsuleModal or UnAbleTimecaplsuleModal*/}
        {/* {isModal && (
          <Modal closeModal={() => setIsModal(false)}>
            <AbleTimecaplsuleModal />
          </Modal>
        )} */}
      </div>
    </div>
  );
}
