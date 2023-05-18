"use client";

import Image from "next/image";
import { useNotifiacationList } from "@/hooks/queries/notification";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNotification } from "@/app/api/notification";
import { KEYS } from "@/constants/queryKeys";
import { putAcceptFollow, putRejectFollow, postBlock } from "@/app/api/friend";
import LoadingLottie from "../lottie/Loading";
import NotResultLottie from "../lottie/NotResult";

type Props = {
  type: string;
};

export default function Notification({ type }: Props) {
  const { data: notiList, isLoading } = useNotifiacationList(type);
  const router = useRouter();

  const queryClient = useQueryClient();

  const useDeleteNotiMutation = useMutation({
    mutationFn: (notificationSeq: number) =>
      deleteNotification(notificationSeq),
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.notification);
    },
  });

  const usePutAcceptMutation = useMutation({
    mutationFn: (targetSeq: number) => putAcceptFollow(targetSeq),
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.notification);
    },
  });

  const usePutRejectMutation = useMutation({
    mutationFn: (targetSeq: number) => putRejectFollow(targetSeq),
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.notification);
    },
  });

  const usePostBlockMutation = useMutation({
    mutationFn: (targetSeq: number) => postBlock(targetSeq),
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.notification);
    },
  });

  return (
    <div>
      {notiList && notiList.length !== 0 ? (
        notiList.map((list, idx) => {
          return (
            <div
              key={idx}
              className="w-full mt-4 border-2 border-black rounded-md"
            >
              <div className="flex border-b-2 border-black h-10 w-full">
                <div className="flex items-center justify-center w-2/12 border-r-2 border-black bg-slate-300">
                  <p>{list.type}</p>
                </div>
                <div className="w-8/12 flex flex-col items-center justify-center text-center py-2">
                  {list.content === "NEW FRIEND ASK" && (
                    <div className="text-sm">
                      {list.fromUserName}님으로 부터 친구요청이 왔습니다
                    </div>
                  )}
                </div>
                <div className="w-2/12 border-l-2 border-black flex items-center justify-center bg-slate-300">
                  <Image
                    src="/icons/check.svg"
                    alt="checkImg"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              {list.type === "FRIEND" ? (
                <div className="flex">
                  <div
                    className="flex items-center justify-center w-1/3 h-10 border-r-2 border-black bg-yellow"
                    onClick={() => {
                      list.targetSeq &&
                        usePutAcceptMutation.mutate(list.targetSeq);
                    }}
                  >
                    수락
                  </div>
                  <div
                    className="flex items-center justify-center w-1/3 h-10 border-r-2 border-black bg-pink"
                    onClick={() => {
                      list.targetSeq &&
                        usePutRejectMutation.mutate(list.targetSeq);
                    }}
                  >
                    거절
                  </div>
                  <div
                    className="flex items-center justify-center w-1/3 bg-slate-100 h-10"
                    onClick={() => {
                      list.targetSeq &&
                        usePostBlockMutation.mutate(list.targetSeq);
                    }}
                  >
                    차단
                  </div>
                </div>
              ) : (
                <div className="flex">
                  {list.type === "MEMORY" && (
                    <div
                      className="flex items-center justify-center w-1/2 h-10 border-r-2 border-black bg-yellow"
                      onClick={() => router.push("/memory")}
                    >
                      추억으로
                    </div>
                  )}
                  {/* 마이룸 경로 변경 가능 */}
                  {list.type === "MYROOM" && (
                    <div
                      className="flex items-center justify-center w-1/2 h-10 border-r-2 border-black bg-yellow"
                      onClick={() => router.push("/profile/myroom")}
                    >
                      마이룸으로
                    </div>
                  )}
                  <div
                    className="flex items-center justify-center w-1/2 bg-slate-100 h-10"
                    onClick={() =>
                      useDeleteNotiMutation.mutate(list.notificationSeq)
                    }
                  >
                    확인
                  </div>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="flex flex-col justify-center items-center mt-[10vh]">
          <NotResultLottie />
          <div className="mt-8"> {type} 리스트가 없습니다. </div>
        </div>
      )}
    </div>
  );
}
