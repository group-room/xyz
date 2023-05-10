"use client";

import React, { useEffect, useState } from "react";
import Container from "../common/Container";
import { MemoriesTypes } from "@/types/memory";
import Link from "next/link";
import { sliceDate } from "@/utils/dateUtils";
import LikeBtn from "./LikeBtn";
import Image from "next/image";

interface MemoryItemProps {
  memory: MemoriesTypes;
}

function MemoryItem({ memory }: MemoryItemProps) {
  const {
    memorySeq,
    memoryImage,
    accessibility,
    aztSeq,
    aztName,
    date,
    latitude,
    longitude,
    location,
    likeCnt,
    isLiked,
    commentCnt,
  } = memory;

  return (
    <Container
      title={true}
      titleBgColor="blue"
      titleText={aztName}
      titleImgSrc="/icons/users.svg"
      titleImgAlt="그룹 아이콘"
    >
      <Link href={`memory/${memorySeq}`}>
        <div className="flex gap-x-3 mb-1">
          <div className="flex-none">
            <img
              src={memoryImage}
              alt="추억 사진"
              width={120}
              className="rounded max-w-[120px]"
            />
          </div>
          <div className="w-full flex flex-col justify-evenly">
            <div className="flex justify-between mb-1">
              <div className="flex gap-x-2">
                <img src="/icons/calendar.svg" alt="캘린더 아이콘" />
                <span>{sliceDate(date)}</span>
              </div>
            </div>
            <div className="flex items-start gap-x-2">
              <img src="/icons/pin.svg" alt="위치 아이콘" className="mt-1" />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex gap-x-2">
        <LikeBtn memorySeq={memorySeq} isLiked={isLiked} likeCnt={likeCnt} />
        <div className="flex gap-x-1">
          <Image
            src="/icons/chat.svg"
            alt="댓글 아이콘"
            width={17}
            height={17}
          />
          <span>{commentCnt}</span>
        </div>
      </div>
    </Container>
  );
}

export default MemoryItem;
