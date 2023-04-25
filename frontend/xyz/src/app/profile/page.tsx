"use client";
import Modal from "@/components/Modal";
import Tab from "@/components/Tab";
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
        <Modal closeModal={() => setIsModal(false)}>
          {<div>친구하실래요?</div>}
        </Modal>
      )}

      <Tab />
    </div>
  );
}

export default ProfilePage;
