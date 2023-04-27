"use client";

import React, { useState } from "react";
import ToggleBtn from "./../../components/common/ToggleBtn";
import TimecapsuleList from "./../../components/timecapsule/TimecapsuleList";
import TimecapsuleMachine from "@/components/timecapsule/TimecapsuleMachine";
import AllTimecapsuleList from "@/components/timecapsule/AllTimecapsuleList";

function CapsulePage() {
  const [value, setValue] = useState(true);

  const handleChange = (newValue: boolean) => {
    setValue(newValue);
    console.log("value", value);
  };

  return (
    <div>
      <div className="mb-2">
        <TimecapsuleList />
      </div>

      <div className={`${value ? "mb-2" : ""} shadow-md`}>
        <ToggleBtn
          textL="타임캡슐 뽑기"
          textR="타임캡슐 목록"
          imgL="/icons/gift.svg"
          imgR="/icons/folder.svg"
          value={value}
          onChange={handleChange}
        />
      </div>

      {value ? <TimecapsuleMachine /> : <AllTimecapsuleList />}
    </div>
  );
}

export default CapsulePage;
