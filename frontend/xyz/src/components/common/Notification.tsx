"use client";

import Image from "next/image";
import { useNotifiacationList } from "@/hooks/queries/notification";

type Props = {
  type: string;
};

export default function Notification({ type }: Props) {
  const { data: notiList, isLoading } = useNotifiacationList(type);

  if (notiList) {
    console.log(notiList);
  }

  return (
    <div>
      {notiList ? (
        notiList.map((list, idx) => {
          return (
            <div
              key={idx}
              className="w-full mt-4 border-2 border-black rounded-md"
            >
              <div className="flex border-b-2 border-black h-10 w-full">
                <div className="flex items-center justify-center w-14 border-r-2 border-black bg-slate-300">
                  <p>{list.type}</p>
                </div>
                <div className="w-[250px] flex items-center justify-center">
                  <p>{list.content}</p>
                </div>
                <div className="w-10 border-l-2 border-black flex items-center justify-center bg-slate-300">
                  <Image
                    src="/icons/check.svg"
                    alt="checkImg"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="flex items-center justify-center w-1/3 h-10 border-r-2 border-black bg-yellow">
                  수락
                </div>
                <div className="flex items-center justify-center w-1/3 h-10 border-r-2 border-black bg-pink">
                  거절
                </div>
                <div className="flex items-center justify-center w-1/3 bg-slate-100 h-10">
                  차단
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>로딩중</div>
      )}
    </div>
  );
}
