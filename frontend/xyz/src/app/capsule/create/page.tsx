"use client";

import Btn from "@/components/common/Btn";
import KakaoMap from "@/components/memory/KakaoMap";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DropDown from "@/components/memory/DropDown";
import { useAztList } from "@/hooks/queries/azt";
import { AztTypes } from "@/types/azt";
import CapsulePhotoUpload from "@/components/timecapsule/CapsulePhotoUpload";
import SearchPostCode from "@/components/timecapsule/SearchPostCode";

export default function TimeCapsuleCreatePage() {
  // 그룹(아지트) 리스트 불러오기
  const [currAzt, setCurrAzt] = useState<AztTypes[]>([]);
  const [aztList, setAztList] = useState<AztTypes[]>([]);

  const { data: aztListData, isLoading } = useAztList();
  useEffect(() => {
    if (aztListData) {
      setAztList(aztListData);
      setCurrAzt([aztListData[0]]);
    }
  }, [aztListData]);

  // 타임 캡슐 생성 폼 제출
  const handleSubmitCapsule = () => {};

  return (
    <div>
      <h2 className="text-xl">타임캡슐 만들기</h2>
      <form
        action=""
        className="flex flex-col justify-center align-middle gap-y-5 mt-5"
        onSubmit={handleSubmitCapsule}
      >
        <DropDown
          isAzt
          iconSrc="/icons/users.svg"
          aztList={aztList}
          currAzt={currAzt}
          setCurrAzt={setCurrAzt}
        />
        <CapsulePhotoUpload />
        <SearchPostCode />
      </form>
    </div>
  );
}
