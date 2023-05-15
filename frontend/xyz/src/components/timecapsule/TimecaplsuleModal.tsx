"use client";

import Image from "next/image";
import capsuleImg from "../../../public/images/capsule.svg";
import { CapsuleAztTypes } from "@/types/capsule";
import Btn from "@/components/common/Btn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postOpenCapsule } from "@/app/api/capsule";
import { KEYS } from "@/constants/queryKeys";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  detail: CapsuleAztTypes;
};

export default function AbleTimecaplsuleModal({ detail }: Props) {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const router = useRouter();
  const queryClient = useQueryClient();

  const usePostOpenCapsuleMutation = useMutation({
    mutationFn: (tcSeq: number) => postOpenCapsule(tcSeq, latitude, longitude),
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.capsule);
    },
  });

  useEffect(() => {
    // 위치 정보를 가져오는 함수
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

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
      {detail.openStatus === "UPDATABLE" && (
        <>
          <Image className="mb-8" src={capsuleImg} alt="capsuleImg"></Image>
          <Btn
            bgColor="blue"
            text="타임캡슐 내용 추가"
            btnFunc={() => router.push(`/capsule/add/${detail.tcSeq}`)}
          />
        </>
      )}
    </div>
  );
}
