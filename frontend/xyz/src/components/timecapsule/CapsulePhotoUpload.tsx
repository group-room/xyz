"use client";

import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import Image from "next/image";
import { timerSwal } from "@/utils/swalUtils";

// 한국어 설정
registerLocale("ko", ko);

type Props = {
  isAdd: boolean;
  openStart?: Date;
  setOpenStart?: Dispatch<SetStateAction<Date>>;
  openEnd?: Date;
  setOpenEnd?: Dispatch<SetStateAction<Date>>;
  updateEnd?: Date;
  setUpdateEnd?: Dispatch<SetStateAction<Date>>;
  photos: File[];
  setPhotos: Dispatch<SetStateAction<File[]>>;
  photoPreviewList: string[];
  setPhotoPreviewList: Dispatch<SetStateAction<string[]>>;
  isPhotoChanged?: boolean;
  setIsPhotoChanged?: Dispatch<SetStateAction<boolean>>;
};

export default function CapsulePhotoUpload({
  isAdd,
  openStart,
  setOpenStart,
  openEnd,
  setOpenEnd,
  updateEnd,
  setUpdateEnd,
  photos,
  setPhotos,
  photoPreviewList,
  setPhotoPreviewList,
  setIsPhotoChanged,
}: Props) {
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    openStart as Date,
    openEnd as Date,
  ]);
  const [startDate, endDate] = dateRange;

  const onChange = (update: [Date, Date]) => {
    setDateRange(update);
    update && setOpenStart && setOpenStart(update[0]);
    update && setOpenEnd && setOpenEnd(update[1]);
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 사진을 편집했다면, 사진 변경 여부를 true로 설정
    if (photos && setIsPhotoChanged) {
      setIsPhotoChanged(true);
    }

    const fileList: any = event.target.files;
    if (fileList) {
      if (fileList.length > 10) {
        timerSwal("사진은 최대 10장까지 업로드 가능합니다.");
        return;
      }

      // 사진 10장까지만 저장하기
      const selectedPhotos: File[] = [];
      const selectedPhotoPreviewList: string[] = [];
      for (let i = 0; i < Math.min(fileList.length, 10); i++) {
        const photo: File = fileList[i];
        selectedPhotos.push(photo);
        selectedPhotoPreviewList.push(URL.createObjectURL(photo));
      }
      setPhotos(selectedPhotos);
      setPhotoPreviewList(selectedPhotoPreviewList);
    }
  };

  useEffect(() => {
    if (photos) {
      const selectedPhotoPreviewList: string[] = [];
      for (const photo of photos) {
        selectedPhotoPreviewList.push(URL.createObjectURL(photo));
      }
      setPhotoPreviewList(selectedPhotoPreviewList);
    }
  }, [photos]);

  return (
    <div className="border border-black rounded-md">
      {isAdd ? (
        <div></div>
      ) : (
        <>
          <div className="flex items-center justify-center h-9 border-b border-black">
            <DatePicker
              className="flex text-center w-full text-lg"
              locale="ko"
              dateFormat="yy.MM.dd"
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={onChange}
              isClearable={true}
            />
            <div className="flex items-center justify-center bg-pink px-2 border-l border-black h-full">
              <Image
                src="/icons/save.svg"
                alt="icon"
                width="0"
                height="0"
                className="w-full h-9 py-1 px-2 border-r border-black"
              />
              <Image
                src="/icons/close.svg"
                alt="icon"
                width="0"
                height="0"
                className="w-full h-9 p-2"
              />
            </div>
          </div>
          <div className="flex justify-center items-center border-b border-black h-9">
            <div className="flex justify-center items-center w-2/5 border-r border-black h-9">
              수정 마감 일
            </div>
            <DatePicker
              className="flex text-center w-full text-lg"
              locale="ko"
              dateFormat="yy.MM.dd"
              selected={updateEnd}
              onChange={(date: Date) => setUpdateEnd && setUpdateEnd(date)}
              isClearable={true}
            />
          </div>
        </>
      )}

      {/* 사진 첨부 영역 */}
      <div className="w-full ">
        <div className="flex items-center justify-center  ">
          <label
            htmlFor="input-file"
            className="w-full py-1 text-center cursor-pointer"
          >
            {photos?.length > 0
              ? "ヘㅏ진 ㉰시 선택㉭ドブl"
              : "バr진을 첨부ぁĦ 주パㅔ요"}
          </label>
          <input
            type="file"
            id="input-file"
            accept="image/*"
            onChange={handlePhotoChange}
            multiple
            className="hidden"
          />
        </div>
        <div className="flex flex-wrap items-center justify-center">
          {/* 첨부 사진 보여주는 영역 */}
          {photoPreviewList.length > 0 &&
            photoPreviewList?.map((url) => (
              <img
                key={url}
                src={url}
                alt="Preview"
                className="object-scale-down h-20 w-30 p-1"
              />
            ))}
        </div>
      </div>
    </div>
  );
}
