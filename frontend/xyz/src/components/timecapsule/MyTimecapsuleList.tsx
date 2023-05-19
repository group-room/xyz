"use client";

import { useMyCapsuleList } from "@/hooks/queries/capsule";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MyTimecapsuleList() {
  const router = useRouter();

  const { data: myCapsuleList, isLoading } = useMyCapsuleList();

  const moveToDetail = (tcSeq: number) => {
    router.push(`/capsule/${tcSeq}`);
  };

  return (
    <div className="flex flex-wrap rounded rounded-t-none border-black p-2">
      {myCapsuleList ? (
        myCapsuleList.map((list) => {
          return (
            <Image
              key={list.tcSeq}
              src="/images/capsule.svg"
              alt="capsuleImg"
              width="0"
              height="0"
              className="w-1/3 h-auto"
              onClick={() => moveToDetail(list.tcSeq as number)}
            />
          );
        })
      ) : (
        <div>로딩중</div>
      )}
    </div>
  );
}
