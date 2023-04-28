import React from "react";
import Container from "../common/Container";
import { MemoriesTypes } from "@/types/memory";
import Link from "next/link";

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
  } = memory;
  return (
    <Link href={`memory/${memorySeq}`}>
      <Container title={true} titleBgColor="blue" titleText={aztName}>
        <div className="flex justify-between items-start gap-x-3">
          <div>
            <img src={memoryImage} alt="추억 사진" />
          </div>
          <div>
            <div className="flex gap-x-2">
              <img src="/icons/calendar.svg" alt="캘린더 아이콘" />
              <span>{date}</span>
            </div>
            <div className="flex gap-x-2">
              <img src="/icons/pin.svg" alt="위치 아이콘" />
              <span>{location}</span>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <img src="/icons/heart.svg" alt="하트 아이콘" />
            <span>{likeCnt}</span>
          </div>
        </div>
      </Container>
    </Link>
  );
}

export default MemoryItem;
