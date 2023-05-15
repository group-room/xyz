"use client";

import { useState } from "react";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMemoryComment } from "@/app/api/memory";
import { queryKeys } from "@/constants/queryKeys";
import ProfileImg from "../common/ProfileImg";
import ModalBtn from "../common/ModalBtn";
import { useAppSelector } from "@/hooks/redux";

interface CommentItemProps {
  commentSeq: number;
  profileImage: string;
  nickname: string;
  content: string;
  memorySeq: number;
  userSeq: number;
}

function CommentItem({
  commentSeq,
  profileImage,
  nickname,
  content,
  memorySeq,
  userSeq,
}: CommentItemProps) {
  const loggedInUserSeq = useAppSelector(
    (state) => state.auth.userInfo?.userSeq
  );

  const queryClient = useQueryClient();
  const useDeleteMemoryCommentMutation = useMutation({
    mutationFn: () => deleteMemoryComment(commentSeq),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.memory.memoryDetail(memorySeq));
      alert("댓글이 삭제되었어요.");
    },
  });

  const [isModal, setIsModal] = useState(false);
  const handleClickModalYes = () => {
    useDeleteMemoryCommentMutation.mutate();
  };

  const handleDeleteClick = () => {
    setIsModal(true);
  };

  return (
    <>
      <div className="flex gap-x-3 py-3">
        <div className="flex-none">
          <ProfileImg imgSrc={profileImage} />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between pr-2">
            <p className="mb-1 mt-2">{nickname} :</p>
            {loggedInUserSeq === userSeq && (
              <button onClick={handleDeleteClick}>
                <Image
                  src="/icons/close.svg"
                  alt="삭제 아이콘"
                  width={12}
                  height={12}
                />
              </button>
            )}
          </div>
          <p>{content}</p>
        </div>
      </div>
      {isModal && (
        <ModalBtn
          yesFunc={handleClickModalYes}
          closeModal={() => setIsModal(false)}
          text="댓글을 삭제할까요?"
        />
      )}
    </>
  );
}

export default CommentItem;
