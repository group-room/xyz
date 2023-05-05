"use client";

import React, { useState } from "react";
import { SlugProps } from "@/types/common";
import { useMemoryList } from "@/hooks/queries/memory";
import MemoryItem from "@/components/memory/MemoryItem";
import ToggleBtn from "@/components/common/ToggleBtn";
import Textbox from "@/components/common/Textbox";
import Image from "next/image";
import Link from "next/link";

function AzitDetailPage({ params: { slug } }: SlugProps) {
  const { data: aztMemoryData, isLoading: isAztMemoryLoading } = useMemoryList({
    date: null,
    aztSeq: slug,
  });
  const [btnValue, setBtnValue] = useState(true);

  const handleChange = (selectedBtn: boolean) => {
    setBtnValue(selectedBtn);
  };

  function SelectedContent() {
    if (btnValue) {
      if (isAztMemoryLoading) return <div>로딩중...</div>;
      return (
        <>
          {aztMemoryData && aztMemoryData.length ? (
            aztMemoryData.map((memory) => (
              <MemoryItem key={memory.memorySeq} memory={memory} />
            ))
          ) : (
            <div>
              <p>추억이 없어요 ㅠㅠ</p>
            </div>
          )}
        </>
      );
    } else {
      if (isAztMemoryLoading) return <div>로딩중...</div>;
      return (
        <>
          {aztMemoryData && aztMemoryData.length ? (
            aztMemoryData.map((memory) => (
              <MemoryItem key={memory.memorySeq} memory={memory} />
            ))
          ) : (
            <div>
              <p>타임캡슐이 없어요 ㅠㅠ</p>
            </div>
          )}
        </>
      );
    }
  }

  return (
    <div>
      <div className="flex gap-x-5 justify-between pt-3 pb-5">
        <div className="grow">
          <Textbox icon="/icons/users.svg" alt="아지트 아이콘" bgColor="pink" />
        </div>
        <div className="flex gap-x-2 items-center">
          <Link href={`chat/${slug}`}>
            <Image
              src="/icons/chat.svg"
              alt="아지트 채팅"
              width={20}
              height={20}
            />
          </Link>
          <Link href={`azt/${slug}/info`}>
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
        textL={`추억앨범 (${aztMemoryData?.length})`}
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

export default AzitDetailPage;
