"use client";

import React, { useState, useEffect } from "react";
import ToggleBtn from "./../../components/common/ToggleBtn";
import TimecapsuleList from "./../../components/timecapsule/TimecapsuleList";
import TimecapsuleMachine from "@/components/timecapsule/TimecapsuleMachine";
import AllTimecapsuleList from "@/components/timecapsule/AllTimecapsuleList";
import { useOpenCapsuleList } from "@/hooks/queries/capsule";
import { CapsuleAztTypes } from "@/types/capsule";

function CapsulePage() {
  const [value, setValue] = useState(true);

  const { data: openCapsuleList, isLoading } = useOpenCapsuleList();

  const handleChange = (newValue: boolean) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="mb-2">
        <TimecapsuleList />
      </div>

      <div className={`${value ? "mb-2" : ""}`}>
        <ToggleBtn
          textL="타임캡슐 뽑기"
          textR="타임캡슐 목록"
          imgL="/icons/gift.svg"
          imgR="/icons/folder.svg"
          value={value}
          onChange={handleChange}
        />
      </div>

      {value ? (
        <TimecapsuleMachine
          openCapsuleList={openCapsuleList as CapsuleAztTypes[]}
        />
      ) : (
        <AllTimecapsuleList
          openCapsuleList={openCapsuleList as CapsuleAztTypes[]}
        />
      )}
    </div>
  );
}

export default CapsulePage;
