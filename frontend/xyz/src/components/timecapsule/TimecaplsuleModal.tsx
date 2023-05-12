"use client";

import Image from "next/image";
import capsuleImg from "../../../public/images/capsule.svg";
import { CapsuleAztTypes } from "@/types/capsule";
import Btn from "@/components/common/Btn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postOpenCapsule } from "@/app/api/capsule";
import { KEYS } from "@/constants/queryKeys";

type Props = {
  detail: CapsuleAztTypes;
};

export default function AbleTimecaplsuleModal({ detail }: Props) {
  const queryClient = useQueryClient();

  const usePostOpenCapsuleMutation = useMutation({
    mutationFn: (tcSeq: number) => postOpenCapsule(tcSeq),
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.capsule);
    },
  });

  const handleClick = (tcSeq: number) => {
    usePostOpenCapsuleMutation.mutate(tcSeq);
  };

  return (
    <div className="flex flex-col items-center justify-center my-8 mx-4 w-72">
      <h1 className="text-2xl mb-4">[ {detail.aztName} ]</h1>
      <h1 className="text-2xl mb-4">{detail.tcSeq}번째 타임캡슐</h1>

      <h4 className="text-lg mb-8">{detail.location}</h4>
      {detail.openStatus === "OPENABLE" && (
        <>
          <Image className="mb-8" src={capsuleImg} alt="capsuleImg"></Image>
          <Btn
            bgColor="blue"
            text="타임캡슐 열기"
            btnFunc={() => handleClick(detail.tcSeq as number)}
          />
        </>
      )}
      {detail.openStatus === "LOCKED" && (
        <Image className="mb-8" src={capsuleImg} alt="capsuleImg"></Image>
      )}
    </div>
  );
}
