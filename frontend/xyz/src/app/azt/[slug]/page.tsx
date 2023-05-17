"use client";

import React, { useState } from "react";
import { SlugProps } from "@/types/common";
import { useMemoryList } from "@/hooks/queries/memory";
import MemoryItem from "@/components/memory/MemoryItem";
import ToggleBtn from "@/components/common/ToggleBtn";
import Textbox from "@/components/common/Textbox";
import Image from "next/image";
import Link from "next/link";
import { useAztCapsuleList } from "@/hooks/queries/capsule";
import { API } from "@/constants/queryKeys";
import { useAztInfo } from "@/hooks/queries/azt";
import { LOCAL } from "@/constants/localUrl";
import { useRouter } from "next/navigation";
import MemoryCreateBtn from "@/components/memory/MemoryCreateBtn";
import LoadingLottie from "@/components/lottie/Loading";
import CapsuleCreateBtn from "@/components/azt/CapsuleCreateBtn";
import NotResultLottie from "@/components/lottie/NotResult";

function AzitDetailPage({ params: { slug } }: SlugProps) {
  const { data: aztInfoData, isLoading: isAztInfoLoading } = useAztInfo(slug);
  const { data: aztMemoryData, isLoading: isAztMemoryLoading } = useMemoryList({
    date: null,
    aztSeq: slug,
  });
  const { data: aztCapsuleData, isLoading: isAztCapsuleLoading } =
    useAztCapsuleList(slug);

  const [btnValue, setBtnValue] = useState(true); // true면 추억앨범, false면 타임캡슐
  const handleChange = (selectedBtn: boolean) => {
    setBtnValue(selectedBtn);
  };
  const router = useRouter();

  function SelectedContent() {
    if (btnValue) {
      if (isAztMemoryLoading)
        return (
          <div>
            <LoadingLottie />
          </div>
        );
      return (
        <>
          {aztMemoryData && aztMemoryData.length ? (
            aztMemoryData.map((memory) => (
              <MemoryItem key={memory.memorySeq} memory={memory} />
            ))
          ) : (
            <div className="text-center">
              <NotResultLottie />
              <p>추억이 없어요 ㅠㅠ</p>
            </div>
          )}
        </>
      );
    } else {
      if (isAztMemoryLoading)
        return (
          <div className="flex justify-center align-middle py-60">
            <LoadingLottie />
          </div>
        );
      return (
        <div className="flex flex-wrap ">
          {aztCapsuleData && aztCapsuleData.length ? (
            aztCapsuleData.map((capule) => (
              // TODO: 타임캡슐 컴포넌트 만들어지면 수정
              // <MemoryItem key={capule.tcSeq} />
              <Image
                key={capule.tcSeq}
                src="/images/capsule.svg"
                alt="capsuleImg"
                width="0"
                height="0"
                className="w-1/3 h-auto"
                onClick={() => router.push(`/capsule/${capule.tcSeq}`)}
              />
            ))
          ) : (
            <div className="text-center">
              <NotResultLottie />
              <p>타임캡슐이 없어요 ㅠㅠ</p>
            </div>
          )}
        </div>
      );
    }
  }

  return (
    <div>
      <div className="flex gap-x-5 justify-between pt-3 pb-5">
        <div className="grow">
          <Textbox
            icon="/icons/users.svg"
            alt="아지트 아이콘"
            bgColor="pink"
            maintext={aztInfoData?.name}
          />
        </div>
        <div className="flex gap-x-2 items-center">
          <Link href={`/${LOCAL.chatting}/${aztInfoData?.chatSeq}`}>
            <Image
              src="/icons/chat.svg"
              alt="아지트 채팅"
              width={20}
              height={20}
            />
          </Link>
          <Link href={`/${API.azt}/${slug}/info`}>
            <Image
              src="/icons/info.svg"
              alt="아지트 상세정보"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>
      <ToggleBtn
        textL={`추억앨범 ${aztMemoryData ? `(${aztMemoryData?.length})` : ""}`}
        textR={`열린 타임캡슐 ${
          aztCapsuleData ? `(${aztCapsuleData?.length})` : ""
        }`}
        imgL="/icons/folder.svg"
        imgR="/icons/folder.svg"
        value={btnValue}
        onChange={handleChange}
      />
      <div className="flex flex-col gap-y-5 px-4 py-6 rounded rounded-t-none border border-t-0 border-black">
        <SelectedContent />
      </div>
      {btnValue ? <MemoryCreateBtn /> : <CapsuleCreateBtn />}
    </div>
  );
}

export default AzitDetailPage;
