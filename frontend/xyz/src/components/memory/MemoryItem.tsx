"use client";

import React, { useEffect, useState } from "react";
import Container from "../common/Container";
import { MemoriesTypes } from "@/types/memory";
import Link from "next/link";
import { addMemoryLike, deleteMemoryLike } from "@/app/api/memory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEYS } from "@/constants/queryKeys";

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
  // const [isLocalLiked, setIsLocalLiked] = useState<boolean>(false);
  // const [localLikeCnt, setLocalLikeCnt] = useState<number>(0);

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

  // const handleClickLike = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   if (isLocalLiked) {
  //     deleteMemoryLike(memorySeq)
  //       .then(() => {
  //         setIsLocalLiked(false);
  //         if (localLikeCnt >= 1) {
  //           setLocalLikeCnt((prev) => prev! - 1);
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //     addMemoryLike(memorySeq)
  //       .then(() => {
  //         setIsLocalLiked(true);
  //         setLocalLikeCnt((prev) => prev + 1);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };

  const handleClickLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      useDeleteMemoryLikeMutation.mutate();
    } else {
      useAddMemoryLikeMutation.mutate();
    }
  };

  // useEffect(() => {
  //   setIsLocalLiked(isLiked);
  //   setLocalLikeCnt(likeCnt);
  // }, [isLiked, likeCnt]);

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
              className="rounded"
            />
          </div>

          <div className="w-full flex flex-col justify-evenly">
            <div className="flex justify-between mb-1">
              <div className="flex gap-x-2">
                <img src="/icons/calendar.svg" alt="캘린더 아이콘" />
                <span>{date.slice(0, 10)}</span>
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
