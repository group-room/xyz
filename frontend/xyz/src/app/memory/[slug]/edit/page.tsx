"use client";

import Btn from "@/components/common/Btn";
import KakaoMap from "@/components/memory/KakaoMap";
import { PhotoMetadata, PositionTypes } from "@/types/memory";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PhotoUpload from "@/components/memory/PhotoUpload";
import { editMemory } from "@/app/api/memory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEYS } from "@/constants/queryKeys";
import { convertDate } from "@/utils/dateUtils";
import { useMemoryDetail } from "@/hooks/queries/memory";
import Textbox from "@/components/common/Textbox";

type Props = {
  params: {
    slug: number;
  };
};

function MemoryEditPage({ params: { slug } }: Props) {
  const { data: memory, isLoading: isMemoryLoading } = useMemoryDetail(slug);

  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currLocation, setCurrLocation] = useState<PositionTypes>({
    lat: 0,
    lng: 0,
  }); // 현재 위치
  const [position, setPosition] = useState<PositionTypes>({ lat: 0, lng: 0 }); // 마커 찍는 위치
  const [address, setAddress] = useState<string>(""); // 현재 위치 or 마커 위치 주소로 변환
  const [photos, setPhotos] = useState<File[]>([]); // 업로드한 사진 파일들
  const [photoPreviewList, setPhotoPreviewList] = useState<string[]>([]); // 사진 미리보기용 (생성 - 업로드한 사진파일에서 변환, 편집 - 서버 url)
  const [isPhotoChanged, setIsPhotoChanged] = useState<boolean>(false); // 사진 변경 여부
  const [metadata, setMetadata] = useState<PhotoMetadata | null>(null);
  const [content, setContent] = useState<string>("");

  const queryClient = useQueryClient();
  const useEditMemoryMutation = useMutation({
    mutationFn: (formData: FormData) => editMemory(slug, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.memory);
    },
  });

  useEffect(() => {
    if (memory) {
      console.log(memory);
      const {
        aztSeq,
        aztName,
        commentCnt,
        content,
        memorySeq,
        memoryImage,
        date,
        latitude,
        longitude,
        location,
        files,
      } = memory;
      setAddress(location);
      setPosition({ lat: latitude, lng: longitude });
      setContent(content);
      setSelectedDate(new Date(date));
      files.forEach((file) => {
        setPhotoPreviewList((prev) => [...prev, file.filePath]);
      });

      // 사진 파일로 변환해서 저장
      // let temp: File[] = [];
      // files.forEach((file) => {
      //   const blob = new Blob([file.filePath], { type: file.fileType });
      //   const newFile = new File([blob], file.filePath, {
      //     type: file.fileType,
      //   });
      // const newFile = new File([file.filePath], file.filePath, {
      //   type: file.fileType,
      // });
      //   temp.push(newFile);
      // });
      // setPhotos(temp);
    }
  }, [memory]);

  const handleSubmitMemory = (e?: React.FormEvent): void => {
    e!.preventDefault();

    const formData = new FormData();
    const stringifiedData = JSON.stringify({
      content: content,
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
    formData.append("modifyMemoryRequest", jsonData);

    // 사진 편집한 경우에만 사진 업로드
    if (isPhotoChanged) {
      photos.forEach((photo) => {
        formData.append("images", photo);
      });
    }

    useEditMemoryMutation.mutate(formData, {
      onSuccess: () => {
        router.push(`/memory/${slug}`); // 편집 완료후 상세로 이동
      },
    });
  };

  const handleDateChange = (date: Date) => setSelectedDate(date);

  return (
    <div>
      <h2 className="text-xl">추억 수정하기</h2>
      {memory ? (
        <form
          action=""
          className="flex flex-col justify-center align-middle gap-y-2 mt-1"
          onSubmit={handleSubmitMemory}
        >
          <Textbox
            icon={"/icons/users.svg"}
            alt={"그룹 아이콘"}
            maintext={memory.aztName}
            bgColor="blue"
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
            isPhotoChanged={isPhotoChanged}
            setIsPhotoChanged={setIsPhotoChanged}
          />

          <KakaoMap
            currLocation={currLocation}
            setCurrLocation={setCurrLocation}
            position={position}
            setPosition={setPosition}
            address={address}
            setAddress={setAddress}
            isPhotoUpload
            isPhotoEdit
            height={200}
          />
          <textarea
            rows={5}
            className="border rounded border-black p-1 resize-none"
            placeholder="추억을 작성ぁĦ주パㅔ요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          >
            {content}
          </textarea>
          <Btn
            width="w-full"
            bgColor="yellow"
            text="등&nbsp;&nbsp;록"
            btnFunc={handleSubmitMemory}
          />
        </form>
      ) : (
        <div className="py-4">로딩중 ㄱ-...</div>
      )}
    </div>
  );
}

export default MemoryEditPage;
