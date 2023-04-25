"use client";

import React, { useState } from "react";
import { PropsWithChildren } from "react";
import ReactDOM from "react-dom";

interface Props {
  closeModal: () => void;
}

function Modal({ closeModal, children }: PropsWithChildren<Props>) {
  return (
    <>
      {ReactDOM.createPortal(
        <>
          <div
            onClick={closeModal}
            className={`flex justify-center items-center absolute z-40 top-0 right-0 bg-slate-500 bg-opacity-20 w-full h-full`}
          >
            <div className="border rounded border-black">
              <div
                className={`px-2 py-1 rounded-t border-black border-b bg-[#b9d7ff]`}
                onClick={(e) => e.stopPropagation()}
              ></div>
              <div className="p-2 bg-white">{children}</div>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}

export default Modal;
