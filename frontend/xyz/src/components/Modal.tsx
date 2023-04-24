"use client";

import React, { useState } from "react";
import { PropsWithChildren } from "react";
import ReactDOM from "react-dom";

interface Props {
  closeModal: () => void;
  backgroundOpacity?: string;
  parentClasses?: string;
}

function Modal({
  closeModal,
  backgroundOpacity = "20",
  parentClasses,
  children,
}: PropsWithChildren<Props>) {
  return (
    <>
      {ReactDOM.createPortal(
        <>
          <div
            onClick={closeModal}
            className={`flex justify-center items-center absolute z-40 top-0 right-0 bg-slate-500 bg-opacity-${backgroundOpacity} w-full h-full`}
          >
            <div
              className={`${parentClasses}`}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}

export default Modal;
