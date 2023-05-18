"use client";

import Btn from "@/components/common/Btn";
import KakaoMap from "@/components/memory/KakaoMap";
import { PhotoMetadata, PositionTypes } from "@/types/memory";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PhotoUpload from "@/components/memory/PhotoUpload";
import DropDown from "@/components/memory/DropDown";
import { createMemory } from "@/app/api/memory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEYS } from "@/constants/queryKeys";
import { convertDate } from "@/utils/dateUtils";
import { useAztList } from "@/hooks/queries/azt";
import { AztTypes } from "@/types/azt";
import { timerSwal } from "@/utils/swalUtils";

function MemoryCreatePage() {
  const router = useRouter();
  const [currAzt, setCurrAzt] = useState<AztTypes[]>([]);
  const [aztList, setAztList] = useState<AztTypes[]>([]);
  const [rangeOption, setRangeOption] = useState<string>("PUBLIC");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currLocation, setCurrLocation] = useState<PositionTypes>({
    lat: 0,
    lng: 0,
  }); // 현재 위치
  const [position, setPosition] = useState<PositionTypes>({ lat: 0, lng: 0 }); // 마커 찍는 위치
  const [address, setAddress] = useState<string>(""); // 현재 위치 or 마커 위치 주소로 변환
  const [photos, setPhotos] = useState<File[]>([]); // 업로드한 사진 파일들
  const [photoPreviewList, setPhotoPreviewList] = useState<string[]>([]); // 사진 미리보기용
  const [metadata, setMetadata] = useState<PhotoMetadata | null>(null);
  const [content, setContent] = useState<string>("");

  const queryClient = useQueryClient();
  const useCreateMemoryMutation = useMutation({
    mutationFn: (formData: FormData) => createMemory(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.memory);
    },
  });

  const { data: aztListData, isLoading } = useAztList();
  useEffect(() => {
    if (aztListData) {
      setAztList(aztListData);
      if (aztListData.length > 0) {
        setCurrAzt([aztListData[0]]);
      }
    }
  }, [aztListData]);

  const handleSubmitMemory = (e?: React.FormEvent): void => {
    e!.preventDefault();
    if (currAzt.length === 0) {
      timerSwal("아지트를 먼저 생성해주세요.");
      return;
    }

    if (content.length === 0 && photos.length === 0) {
      timerSwal("추억을 입력해주세요.");
      return;
    }

    const formData = new FormData();
    const stringifiedData = JSON.stringify({
      content: content,
      accessibility: rangeOption,
      aztSeq: currAzt[0].aztSeq!,
      date: convertDate(selectedDate),
      latitude: +position.lat.toFixed(7),
      longitude: +position.lng.toFixed(7),
      location: address,
    });
    const jsonData = new Blob([stringifiedData], {
      type: "application/json",
    });
    // 음성이든 비디오든 할 경우...
    // const videofile = new File([videoFiles], "videoFile.webm", {
    //   type: "video/webm",
    // });
    formData.append("addMemoryRequest", jsonData);
    photos.forEach((photo) => {
      formData.append("images", photo);
    });

    useCreateMemoryMutation.mutate(formData, {
      onSuccess: (data) => {
        // console.log(data);
        const memorySeq = data.data.data.memorySeq;
        router.push(`/memory/${memorySeq}`); // 생성 완료후 상세로 이동
      },
    });
  };

  const handleDateChange = (date: Date) => setSelectedDate(date);

  return (
    <div>
      <h2 className="text-xl">추억 만들기</h2>
      <form
        action=""
        className="flex flex-col justify-center align-middle gap-y-5 mt-5"
        onSubmit={handleSubmitMemory}
      >
        <DropDown
          isAzt
          iconSrc="/icons/users.svg"
          aztList={aztList}
          currAzt={currAzt}
          setCurrAzt={setCurrAzt}
        />
        <DropDown
          iconSrc="/icons/lock-fill.svg"
          rangeOption={rangeOption}
          setRangeOption={setRangeOption}
        />
        <PhotoUpload
          selectedDate={selectedDate}
          photos={photos}
          setPhotos={setPhotos}
          metadata={metadata}
          setMetadata={setMetadata}
          setPosition={setPosition}
          handleDateChange={handleDateChange}
          photoPreviewList={photoPreviewList}
          setPhotoPreviewList={setPhotoPreviewList}
        />
        <KakaoMap
          currLocation={currLocation}
          setCurrLocation={setCurrLocation}
          position={position}
          setPosition={setPosition}
          address={address}
          setAddress={setAddress}
          isPhotoUpload
          height={200}
        />
        <textarea
          rows={5}
          className="border rounded border-black p-1 resize-none"
          placeholder="추억을 작성ぁĦ주パㅔ요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <Btn
          width="w-full"
          bgColor="yellow"
          text="등&nbsp;&nbsp;록"
          btnFunc={handleSubmitMemory}
        />
      </form>
    </div>
  );
}

export default MemoryCreatePage;
