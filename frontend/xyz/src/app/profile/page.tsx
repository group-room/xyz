"use client";
import Modal from "@/components/Modal";
import React from "react";
import { useState } from "react";

function ProfilePage() {
  const [isModal, setIsModal] = useState(false);

  const handleClick = () => {
    setIsModal(true);
  };
  return (
    <div>
      <div onClick={handleClick}> ProfilePage</div>
      {isModal && (
        <Modal
          backgroundOpacity="20"
          parentClasses="w-full mx-5 p-5 rounded bg-white bg-opacity-30 hover:bg-opacity-50"
          closeModal={() => setIsModal(false)}
        >
          {<div>친구하실래요?</div>}
        </Modal>
      )}
    </div>
  );
}

export default ProfilePage;
