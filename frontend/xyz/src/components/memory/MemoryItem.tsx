"use client";

import React from "react";
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
    // userName,
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
              height={80}
              className="rounded max-w-[120px] object-cover w-96 h-20 shadow"
            />
          </div>
          <div className="w-full flex flex-col justify-evenly">
            {/* <div className="flex items-center gap-x-3">
              <Image
                src="/icons/user.svg"
                alt="유저 아이콘"
                width={12}
                height={12}
              />
              <span>
                {userName.length > 15
                  ? userName.slice(0, 15) + "..."
                  : userName}{" "}
              </span>
            </div> */}
            <div className="flex gap-x-3">
              <Image
                src="/icons/calendar.svg"
                alt="캘린더 아이콘"
                width={12}
                height={12}
              />
              <span>{sliceDate(date)}</span>
            </div>
            <div className="flex items-start gap-x-3">
              <Image
                src="/icons/pin.svg"
                alt="위치 아이콘"
                className="mt-1"
                width={12}
                height={12}
              />
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
