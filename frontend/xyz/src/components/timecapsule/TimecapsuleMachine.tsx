"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CapsuleAztTypes } from "@/types/capsule";
import Modal from "@/components/common/Modal";
import Btn from "../common/Btn";

type Props = {
  openCapsuleList: CapsuleAztTypes[];
};

export default function TimecapsuleMachine({ openCapsuleList }: Props) {
  const router = useRouter();

  const [isMoved, setIsMoved] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const [isModal, setIsModal] = useState(true);

  const handleButtonClick = () => {
    setIsRotated(!isRotated);
    setTimeout(() => {
      setIsMoved(!isMoved);
    }, 1200);
    setIsModal(true);
  };

  return (
    <div>
      <div className="flex items-center justify-center relative">
        <img
          src="/images/machine.png"
          alt="machine"
          className="w-[80vw] h-[50vh] mt-4 "
        />
        <img
          onClick={handleButtonClick}
          src="/images/button.png"
          alt="machine"
          className={`absolute w-[15vw] h-auto bottom-[32%] left-[18%] ${
            isRotated ? "animate-spin-slow" : ""
          }`}
        />
      </div>
      <div className="absolute bottom-32 right-28">
        {isMoved &&
          (openCapsuleList.length !== 0 ? (
            <>
              <Image
                onClick={() => router.push("capsule/random")}
                src="/images/capsule.svg"
                alt="capsule"
                width="0"
                height="0"
                className={`w-[25vw] h-auto  ${
                  isMoved ? "animate-fade-in-transform" : ""
                }`}
              />
            </>
          ) : (
            isModal && (
              <Modal closeModal={() => setIsModal(false)}>
                <div className="flex flex-col justify-center items-center p-10">
                  <div className="mb-6 text-xl">열린 타임캡슐이 없습니다.</div>
                  <div>
                    <Btn
                      className="mr-2"
                      bgColor="blue"
                      text="타입캡슐 생성하기"
                      btnFunc={() => router.push("/capsule/create")}
                    />
                    <Btn
                      bgColor="blue"
                      text="닫기"
                      btnFunc={() => setIsModal(false)}
                    />
                  </div>
                </div>
              </Modal>
            )
          ))}
      </div>
    </div>
  );
}
