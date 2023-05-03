"use client";

import React from "react";
import Btn from "../common/Btn";
import useInput from "@/hooks/useInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEYS, queryKeys } from "@/constants/queryKeys";
import { createMemoryComment } from "@/app/api/memory";

type CommentCreateTypes = {
  memorySeq: number;
};

function CommentCreate({ memorySeq }: CommentCreateTypes) {
  const [commentInput, onChangeCommentInput, resetInputValue] = useInput("");
  const handleBtnClick = () => {
    if (commentInput === "") {
      alert("댓글 내용을 작성해주세요");
      return;
    }
    // console.log(commentInput);
    useCreateMemoryCommentMutation.mutate();
  };

  const queryClient = useQueryClient();
  const useCreateMemoryCommentMutation = useMutation({
    mutationFn: () => createMemoryComment(memorySeq, commentInput.trim()),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.memory.memoryDetail(memorySeq));
      resetInputValue();
    },
  });
  return (
    <div className="flex w-full gap-x-2 border-t border-black p-2">
      <input
        type="text"
        className="grow"
        placeholder="댓글을 입력하세요"
        value={commentInput}
        onChange={onChangeCommentInput}
      />
      <Btn bgColor="yellow" text="등 록" btnFunc={handleBtnClick} />
    </div>
  );
}

export default CommentCreate;
