import React from "react";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMemoryComment } from "@/app/api/memory";
import { queryKeys } from "@/constants/queryKeys";
import ProfileImg from "../common/ProfileImg";

interface CommentItemProps {
  commentSeq: number;
  profileImage: string;
  nickname: string;
  content: string;
  memorySeq: number;
}

function CommentItem({
  commentSeq,
  profileImage,
  nickname,
  content,
  memorySeq,
}: CommentItemProps) {
  const queryClient = useQueryClient();
  const useDeleteMemoryCommentMutation = useMutation({
    mutationFn: () => deleteMemoryComment(commentSeq),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.memory.memoryDetail(memorySeq));
    },
  });
  const handleDeleteClick = () => {
    useDeleteMemoryCommentMutation.mutate();
  };

  return (
    <div className="flex gap-x-3 py-3">
      <div className="flex-none">
        <ProfileImg imgSrc={profileImage} />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-between pr-2">
          <p className="mb-1 mt-2">{nickname} :</p>
          <button onClick={handleDeleteClick}>
            <Image
              src="/icons/close.svg"
              alt="삭제 아이콘"
              width={12}
              height={12}
            />
          </button>
        </div>
        <p>{content}</p>
      </div>
    </div>
  );
}

export default CommentItem;
