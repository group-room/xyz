"use client";

import React, { useEffect, useState } from "react";
import Container from "../common/Container";
import { MemoriesTypes } from "@/types/memory";
import Link from "next/link";
import { addMemoryLike, deleteMemoryLike } from "@/app/api/memory";

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
  const [isLocalLiked, setIsLocalLiked] = useState<boolean>(false);
  const [localLikeCnt, setLocalLikeCnt] = useState<number>(0);
  const handleClickLike = () => {
    // e.stopPropagation();
    // console.log(e);
    if (isLocalLiked) {
      deleteMemoryLike(memorySeq)
        .then(() => {
          setIsLocalLiked(false);
          if (localLikeCnt >= 1) {
            setLocalLikeCnt((prev) => prev! - 1);
          }
        })
        .catch((err) => console.log(err));
    } else {
      addMemoryLike(memorySeq)
        .then(() => {
          setIsLocalLiked(true);
          setLocalLikeCnt((prev) => prev + 1);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    setIsLocalLiked(isLiked);
    setLocalLikeCnt(likeCnt);
  }, [isLiked, likeCnt]);

  return (
    <Container title={true} titleBgColor="blue" titleText={aztName}>
      <Link href={`memory/${memorySeq}`}>
        <div className="flex gap-x-2 mb-1">
          <div className="flex-none">
            <img
              src={memoryImage}
              alt="추억 사진"
              width={120}
              className="rounded"
            />
          </div>

          <div className="w-full flex flex-col justify-evenly">
            <div className="flex justify-between mb-1">
              <div className="flex gap-x-2">
                <img src="/icons/calendar.svg" alt="캘린더 아이콘" />
                <span>{date}</span>
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
        <div
          className="flex gap-x-1 cursor-pointer"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            handleClickLike();
          }}
        >
          {isLocalLiked ? (
            <img src="/icons/heart-fill.svg" alt="하트 아이콘" />
          ) : (
            <img src="/icons/heart.svg" alt="하트 아이콘" />
          )}
          <span>{localLikeCnt}</span>
        </div>
        <div className="flex gap-x-1">
          <img src="/icons/comment.svg" alt="" />
          <span>{commentCnt}</span>
        </div>
      </div>
    </Container>
  );
}

export default MemoryItem;
