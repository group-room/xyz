import { addMemoryLike, deleteMemoryLike } from "@/app/api/memory";
import { KEYS } from "@/constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

type LikeBtnProps = {
  memorySeq: number;
  isLiked: boolean;
  likeCnt: number;
};

function LikeBtn({ memorySeq, isLiked, likeCnt }: LikeBtnProps) {
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
    <div
      className="flex gap-x-1 cursor-pointer w-fit"
      onClick={(e) => handleClickLike(e)}
    >
      {isLiked ? (
        <Image
          src="/icons/heart-fill.svg"
          alt="하트 아이콘"
          width={18}
          height={18}
        />
      ) : (
        <Image
          src="/icons/heart.svg"
          alt="하트 아이콘"
          width={16}
          height={16}
        />
      )}
      <span>{likeCnt}</span>
    </div>
  );
}

export default LikeBtn;
