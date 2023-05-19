"use client";
import { VisitorTypes } from "@/types/user";
import { deleteGuestbook } from "@/app/api/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { useAppSelector } from "@/hooks/redux";

interface GuestbookItemProps {
  visitor: VisitorTypes;
  userSeq: number;
}

function GuestbookItem({ visitor, userSeq }: GuestbookItemProps) {
  const state = useAppSelector((state) => state);
  const myUserSeq = state.auth.userInfo?.userSeq;
  const queryClient = useQueryClient();
  const useDeleteGuestbookMutation = useMutation({
    mutationFn: () => deleteGuestbook(visitor.userSeq, visitor.visitorSeq),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.user.visitor(visitor.userSeq));
    },
  });
  const userSeqToNumber = +userSeq;

  const handleDeleteClick = () => {
    useDeleteGuestbookMutation.mutate();
  };

  //삭제하시겠습니까? 모달 띄우기

  if (myUserSeq === visitor.userSeq || myUserSeq === userSeqToNumber) {
    return (
      <div className="border-2 border-white w-90% h-10% m-2 px-2 rounded flex">
        <div className=" w-full flex justify-between text-white mr-0">
          <div className="">
            {visitor.content} - {visitor.nickname}
          </div>
          <div className="" onClick={handleDeleteClick}>
            x
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="border-2 border-white w-90% h-10% m-2 px-2 rounded">
        <div className=" flex text-white">
          {visitor.content} <br></br>
          {visitor.nickname}
        </div>
      </div>
    );
  }
}

export default GuestbookItem;
