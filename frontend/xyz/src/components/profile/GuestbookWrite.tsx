"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { createGuestbook } from "@/app/api/user";
import { useVisitorList } from "@/hooks/queries/user";
import useInput from "@/hooks/useInput";
import Btn from "../common/Btn";
import { timerSwal } from "@/utils/swalUtils";

type GuestbookWriteProps = {
  userSeq: number;
};

function GuestbookWrite({ userSeq }: GuestbookWriteProps) {
  const {
    data: visitorList,
    isLoading: isVisitorLoading,
    error,
  } = useVisitorList(userSeq!);
  const queryClient = useQueryClient();
  const [contentInput, onChangeContentInput, resetInputValue] = useInput("");

  const userSeqToNumber = +userSeq;
  const useCreateGuestbookMutation = useMutation({
    mutationFn: () => createGuestbook(userSeqToNumber, contentInput.trim()),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.user.visitor(userSeqToNumber));
      resetInputValue();
    },
  });

  const handleGuestbookCreateClick = () => {
    if (contentInput === "") {
      timerSwal("방명록 내용을 작성해주세요");
      return;
    }
    useCreateGuestbookMutation.mutate();
  };

  return (
    <div className="flex w-full gap-x-2 border-t border-white p-2">
      <input
        type="text"
        className="grow"
        placeholder="방명록을 입력하세요"
        value={contentInput}
        onChange={onChangeContentInput}
      />
      <Btn bgColor="yellow" text="등 록" btnFunc={handleGuestbookCreateClick} />
    </div>
  );
}

export default GuestbookWrite;
