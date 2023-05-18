"use client";

import Btn from "@/components/common/Btn";
import React, { useEffect, useState } from "react";
import DropDown from "@/components/memory/DropDown";
import { useAztList } from "@/hooks/queries/azt";
import { AztTypes } from "@/types/azt";
import CapsulePhotoUpload from "@/components/timecapsule/CapsulePhotoUpload";
import SearchPostCode from "@/components/timecapsule/SearchPostCode";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEYS } from "@/constants/queryKeys";
import { postCapsule } from "@/app/api/capsule";
import { useRouter } from "next/navigation";
import { positionTypes } from "@/types/capsule";
import LoadingLottie from "@/components/lottie/Loading";
import { timerSwal } from "../../../utils/swalUtils";
import SelectOpenDay from "@/components/timecapsule/SelectOpenDay";

export default function TimeCapsuleCreatePage() {
  const router = useRouter();
  const today: Date = new Date();
  const after7Days: Date = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

  const [content, setContent] = useState<string>("");
  const [currAzt, setCurrAzt] = useState<AztTypes[]>([]);
  const [aztList, setAztList] = useState<AztTypes[]>([]);
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState<positionTypes>({ lat: 0, lng: 0 }); // 마커 찍는 위치
  const [openStart, setOpenStart] = useState(today);
  const [openEnd, setOpenEnd] = useState(after7Days);
  const [updateEnd, setUpdateEnd] = useState(yesterday);

  const queryClient = useQueryClient();
  const useCreateCapsuleMutation = useMutation({
    mutationFn: (formData: FormData) => postCapsule(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.capsule);
    },
  });

  // 그룹(아지트) 리스트 불러오기
  const { data: aztListData, isLoading } = useAztList();

  const [photos, setPhotos] = useState<File[]>([]); // 업로드한 사진 파일들
  const [photoPreviewList, setPhotoPreviewList] = useState<string[]>([]); // 사진 미리보기용

  useEffect(() => {
    if (aztListData) {
      setAztList(aztListData);
      if (aztListData.length > 0) {
        setCurrAzt([aztListData[0]]);
      }
    }
  }, [aztListData]);

  // 타임 캡슐 생성 폼 제출
  const handleSubmitCapsule = (e?: React.FormEvent): void => {
    e!.preventDefault();

    const formData = new FormData();
    const stringifiedData = JSON.stringify({
      aztSeq: currAzt[0].aztSeq!,
      content: content,
      latitude: position.lat,
      location: address,
      longitude: position.lng,
      openEnd: openEnd,
      openStart: openStart,
      updateEnd: updateEnd,
    });
    const jsonData = new Blob([stringifiedData], {
      type: "application/json",
    });
    // 음성이든 비디오든 할 경우...
    // const videofile = new File([videoFiles], "videoFile.webm", {
    //   type: "video/webm",
    // });
    formData.append("addTcRequest", jsonData);
    photos.forEach((photo) => {
      formData.append("images", photo);
    });

    useCreateCapsuleMutation.mutate(formData, {
      onSuccess: (data) => {
        const tcSeq = data.data.data.tcSeq;
        console.log(tcSeq);
        router.push(`/capsule`);
      },
    });
  };

  const openModal = () => {
    console.log("모달이다");
    timerSwal("생성된 아지트가 없습니다😥\n아지트를 생성해주세요");
    router.push(`/capsule`);
  };

  if (aztListData) {
    console.log(aztListData);
  }

  return (
    <div>
      <h2 className="text-xl">타임캡슐 만들기</h2>
      {aztListData ? (
        aztListData.length === 0 ? (
          <>{openModal()}</>
        ) : (
          <form
            action=""
            className="flex flex-col justify-center align-middle gap-y-3 mt-5"
            onSubmit={handleSubmitCapsule}
          >
            <DropDown
              isAzt
              iconSrc="/icons/users.svg"
              aztList={aztList}
              currAzt={currAzt}
              setCurrAzt={setCurrAzt}
            />
            <SelectOpenDay
              openStart={openStart}
              setOpenStart={setOpenStart}
              openEnd={openEnd}
              setOpenEnd={setOpenEnd}
              updateEnd={updateEnd}
              setUpdateEnd={setUpdateEnd}
            />
            <CapsulePhotoUpload
              isAdd={false}
              openStart={openStart}
              setOpenStart={setOpenStart}
              openEnd={openEnd}
              setOpenEnd={setOpenEnd}
              updateEnd={updateEnd}
              setUpdateEnd={setUpdateEnd}
              photos={photos}
              setPhotos={setPhotos}
              photoPreviewList={photoPreviewList}
              setPhotoPreviewList={setPhotoPreviewList}
            />
            <SearchPostCode
              address={address}
              setAddress={setAddress}
              position={position}
              setPosition={setPosition}
            />
            <textarea
              rows={3}
              className="border rounded border-black p-2 resize-none"
              placeholder="추억을 작성ぁĦ주パㅔ요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <Btn
              width="w-full"
              bgColor="yellow"
              text="등&nbsp;&nbsp;록"
              btnFunc={handleSubmitCapsule}
            />
          </form>
        )
      ) : (
        <LoadingLottie />
      )}
    </div>
  );
}
