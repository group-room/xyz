import React from "react";
import ProfileImg from "@/components/common/ProfileImg";
import { KEYS } from "@/constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFollow, putCancelFollow } from "@/app/api/friend";

type Props = {
  imgSrc: string;
  nickname: string;
  identify: string;
  relation: string;
  userSeq: number;
};

export default function FriendBox({
  imgSrc,
  nickname,
  identify,
  relation,
  userSeq,
}: Props) {
  const queryClient = useQueryClient();

  const usePostFollowMutation = useMutation({
    mutationFn: () =>
      postFollow(userSeq).then(console.log("useSeq mutationFn : ", userSeq)),
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.friend);
    },
  });

  const useCancelFollowMutation = useMutation({
    mutationFn: () => putCancelFollow(userSeq),
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.friend);
    },
  });

  const handleClickFollow = (e) => {
    // 요청 여부에 따라 조건
    console.log("userSeq -> ", userSeq);
    if (relation === "관계 없음") {
      console.log("usePostFollowMutation");
      usePostFollowMutation.mutate();
    } else if (relation === "친구") {
      console.log("useCancelFollowMutation");
      useCancelFollowMutation.mutate();
    }
  };

  return (
    <div className="flex items-center">
      <div className="basis-1/4">
        <ProfileImg imgSrc={imgSrc} />
      </div>

      <div className="basis-2/4 flex flex-col ml-4">
        <div>{nickname}</div>
        <div>{identify}</div>
      </div>
      {relation === "친구" && (
        <div className="basis-1/4 flex items-center justify-center border-2 border-black w-20 h-10 bg-pink board-2 rounded-md">
          채팅
        </div>
      )}
      {relation === "관계 없음" && (
        <div
          className="basis-1/4 flex items-center justify-center border-2 border-black w-20 h-10 bg-pink board-2 rounded-md"
          onClick={(e) => handleClickFollow(e)}
        >
          친구추가
        </div>
      )}
      {relation === "요청 함" && (
        <div
          className="basis-1/4 flex items-center justify-center border-2 border-black w-20 h-10 bg-pink board-2 rounded-md"
          onClick={(e) => handleClickFollow(e)}
        >
          요청중
        </div>
      )}
    </div>
  );
}
