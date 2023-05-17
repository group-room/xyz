import React from "react";
import ProfileImg from "@/components/common/ProfileImg";
import { KEYS } from "@/constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFollow, putCancelFollow, deleteBlock } from "@/app/api/friend";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const queryClient = useQueryClient();

  const usePostFollowMutation = useMutation({
    mutationFn: () => postFollow(userSeq),
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

  const useCancelBlockMutation = useMutation({
    mutationFn: () => deleteBlock(userSeq),
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.friend);
    },
  });

  const handleClickFollow = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // 요청 여부에 따라 조건
    if (relation === "관계 없음") {
      usePostFollowMutation.mutate();
    } else if (relation === "요청 함") {
      useCancelFollowMutation.mutate();
    } else if (relation === "차단함") {
      useCancelBlockMutation.mutate();
    }
  };

  return (
    <div className="flex items-center w-full">
      <div
        className="flex items-center w-4/6 mr-2"
        onClick={() => router.push(`/profile/${userSeq}`)}
      >
        <div className="basis-2/6">
          <ProfileImg imgSrc={imgSrc} />
        </div>

        <div className="basis-6/3 flex flex-col ml-4">
          <div>{nickname}</div>
          <div>{identify}</div>
        </div>
      </div>
      {relation === "친구" && (
        <div
          className="flex items-center justify-center border-2 border-black w-20 h-10 bg-pink board-2 rounded-md"
          onClick={() => router.push("/chat")}
        >
          채팅
        </div>
      )}
      {relation === "관계 없음" && (
        <div
          className="flex items-center justify-center border-2 border-black w-20 h-10 bg-pink board-2 rounded-md"
          onClick={(e) => handleClickFollow(e)}
        >
          친구추가
        </div>
      )}
      {relation === "요청 함" && (
        <div
          className="flex items-center justify-center border-2 border-black w-20 h-10 bg-pink board-2 rounded-md"
          onClick={(e) => handleClickFollow(e)}
        >
          요청중
        </div>
      )}
      {relation === "요청 받음" && (
        <div
          className="flex items-center justify-center border-2 border-black w-20 h-10 bg-pink board-2 rounded-md"
          onClick={(e) => handleClickFollow(e)}
        >
          요청 받음
        </div>
      )}
      {relation === "차단함" && (
        <div
          className="flex items-center justify-center border-2 border-black w-20 h-10 bg-pink board-2 rounded-md"
          onClick={(e) => handleClickFollow(e)}
        >
          차단 해제
        </div>
      )}
    </div>
  );
}
