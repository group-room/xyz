"use client";

import React, { useEffect, useState } from "react";
import Container from "../common/Container";
import { MemoriesTypes } from "@/types/memory";
import Link from "next/link";
import { addMemoryLike, deleteMemoryLike } from "@/app/api/memory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEYS } from "@/constants/queryKeys";
import { sliceDate } from "@/utils/dateUtils";

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

  const queryClient = useQueryClient();
  const useAddMemoryLikeMutation = useMutation({
    mutationFn: () => addMemoryLike(memorySeq),
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.memory);
    },
  });

  const useDeleteMemoryLikeMutation = useMutation({
    mutationFn: () => deleteMemoryLike(memorySeq),
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.memory);
    },
  });

  const handleClickLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      useDeleteMemoryLikeMutation.mutate();
    } else {
      useAddMemoryLikeMutation.mutate();
    }
  };

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
        <div
          className="flex gap-x-1 cursor-pointer"
          onClick={(e) => handleClickLike(e)}
        >
          {isLiked ? (
            <img src="/icons/heart-fill.svg" alt="하트 아이콘" />
          ) : (
            <img src="/icons/heart.svg" alt="하트 아이콘" />
          )}
          <span>{likeCnt}</span>
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
