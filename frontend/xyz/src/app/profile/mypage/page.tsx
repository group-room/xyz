"use client";

import MyTimecapsuleList from "@/components/timecapsule/MyTimecapsuleList";
import React, { useState } from "react";
import { useMyMemoryList } from "@/hooks/queries/memory";
import ToggleBtn from "@/components/common/ToggleBtn";
import MyMemoryItem from "@/components/profile/MyMemoryItem";

function ProfileMypage() {
  const { data: myMemoryData, isLoading: isMyMemoryLoading } =
    useMyMemoryList();

  const [btnValue, setBtnValue] = useState(true);
  const handleChange = (selectedBtn: boolean) => {
    setBtnValue(selectedBtn);
  };
  function SelectedContent() {
    if (btnValue) {
      if (isMyMemoryLoading) return <div>로딩중...</div>;
      return (
        <>
          {myMemoryData && myMemoryData.length ? (
            myMemoryData.map((memory) => (
              <MyMemoryItem key={memory.memorySeq} myMemory={memory} />
            ))
          ) : (
            <div>
              <p>추억이 없어요 ㅠㅠ</p>
            </div>
          )}
        </>
      );
    } else {
      return (
        <div>
          <MyTimecapsuleList />;
        </div>
      );
    }
  }

  return (
    <div>
      <ToggleBtn
        textL={`추억앨범 ${myMemoryData ? `(${myMemoryData?.length})` : ""}`}
        textR="타임캡슐"
        imgL="/icons/folder.svg"
        imgR="/icons/folder.svg"
        value={btnValue}
        onChange={handleChange}
      />

      <div className="flex flex-col gap-y-5 px-4 py-6 rounded rounded-t-none border border-t-0 border-black">
        <SelectedContent />
      </div>
    </div>
  );
}

export default ProfileMypage;
