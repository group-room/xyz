"use client";

import React, { useState } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import CloseModal from "../../../public/icons/close-box.svg";
import No from "../../../public/icons/close.svg";
import Yes from "../../../public/icons/check.svg";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface ModalBtnProps {
  closeModal: () => void;
  text: string;
  yesFunc: () => void;
}

function ModalBtn({ closeModal, yesFunc, text }: ModalBtnProps) {
  // 사용법
  // const [isModal, setIsModal] = useState(false);
  // const buttonYes = () => {
  //     alert("친구가 되었습니다.");
  //   };

  //   const handleClick = () => {
  //     setIsModal(true);
  //   };
  // 이런식으로 함수를 만들고

  {
    /* <div onClick={handleClick}> ProfilePage</div>
      {isModal && (
        <ModalBtn
          yesFunc={buttonYes}
          closeModal={() => setIsModal(false)}
          text="나랑 친구를 해볼래? 나랑 친구를 해볼래?"
        />
      )}
    </div> */
  }

  // 이런식으로 사용하면 됨

  return (
    <>
      {ReactDOM.createPortal(
        <>
          <div
            onClick={closeModal}
            className={`flex justify-center items-center absolute z-[60] top-0 right-0 bg-slate-500 bg-opacity-20 w-full h-full`}
          >
            <div className="border rounded border-black w-[80%]">
              <div
                className={`px-2 py-[6px] rounded-t border-black border-b bg-blue grid justify-items-end`}
                onClick={(e) => e.stopPropagation()}
              >
                {" "}
                <Image
                  src={CloseModal}
                  alt="모달 닫기"
                  onClick={closeModal}
                  width={16}
                />{" "}
              </div>
              <div className=" px-14 bg-white">
                <div className="flex justify-center items-center pt-8 text-lg">
                  {text}
                </div>
                <div className="flex flex-row gap-8 pb-8 pt-6 items-center justify-center ">
                  <div>
                    <button
                      type="button"
                      onClick={yesFunc}
                      className=" border flex flex-row items-center justify-center w-24 rounded-md border-black shadow-md bg-pink"
                    >
                      <div className="p-1">
                        <Image src={Yes} alt="예" width={15} />
                      </div>
                      <div className="p-1">예</div>
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="border flex flex-row items-center justify-center w-24 rounded-md border-black shadow-md"
                    >
                      <div className="p-1">
                        <Image src={No} alt="아니오" width={15} />
                      </div>
                      <div className="p-1">아니오</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}

export default ModalBtn;
