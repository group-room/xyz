"use client";

import React, { useState } from "react";
import { SlugProps } from "@/types/common";
import { useMemoryList } from "@/hooks/queries/memory";
import MemoryItem from "@/components/memory/MemoryItem";
import ToggleBtn from "@/components/common/ToggleBtn";
import Textbox from "@/components/common/Textbox";
import Image from "next/image";
import Link from "next/link";
import { useAztCapsuleList } from "@/hooks/queries/capsule";
import { API } from "@/constants/queryKeys";
import { useAztInfo } from "@/hooks/queries/azt";
import { LOCAL } from "@/constants/localUrl";
import { useRouter } from "next/navigation";
import MemoryCreateBtn from "@/components/memory/MemoryCreateBtn";
import LoadingLottie from "@/components/lottie/Loading";
import CapsuleCreateBtn from "@/components/azt/CapsuleCreateBtn";
import NotResultLottie from "@/components/lottie/NotResult";
import { CapsuleAztTypes } from "@/types/capsule";
import Modal from "@/components/common/Modal";
import AbleTimecaplsuleModal from "@/components/timecapsule/TimecaplsuleModal";

function AzitDetailPage({ params: { slug } }: SlugProps) {
  const { data: aztInfoData, isLoading: isAztInfoLoading } = useAztInfo(slug);
  const { data: aztMemoryData, isLoading: isAztMemoryLoading } = useMemoryList({
    date: null,
    aztSeq: slug,
  });
  const { data: aztCapsuleData, isLoading: isAztCapsuleLoading } =
    useAztCapsuleList(slug);

  const [btnValue, setBtnValue] = useState(true); // true면 추억앨범, false면 타임캡슐
  const handleChange = (selectedBtn: boolean) => {
    setBtnValue(selectedBtn);
  };

  // 타임캡슐 상태에 따라 표시해줄 모달 (오픈대기중, 투표중, 수정가능)
  const [isModal, setIsModal] = useState({
    is: false,
    detail: {},
  });

  const router = useRouter();
  const moveToDetail = (tcSeq: number) => {
    router.push(`/capsule/${tcSeq}`);
  };

  const formatDate = (dateString: string) => {
    console.log("dateString -> ", dateString);
    const year = dateString.slice(0, 4);
    const month = dateString.slice(5, 7);
    const day = dateString.slice(8, 10);
    return `${year}.${month}.${day}`;
  };

  const handleClickCapsule = (capsule: CapsuleAztTypes) => {
    if (capsule.openStatus === "OPENED") {
      moveToDetail(capsule.tcSeq as number);
    } else if (capsule.openStatus !== "EXPIRED") {
      setIsModal({ is: true, detail: capsule });
    }
  };

  const showStatus = (status: string) => {
    let statusText = "";
    switch (status) {
      case "UPDATABLE":
        statusText = "수정가능";
        break;
      case "OPENABLE":
        statusText = "투표중";
      case "LOCKED":
        statusText = "오픈대기중";
        break;
      case "EXPIRED":
        statusText = "닫힘";
        break;
    }
    return statusText;
  };

  function SelectedContent() {
    if (btnValue) {
      if (isAztMemoryLoading)
        return (
          <div>
            <LoadingLottie />
          </div>
        );
      return (
        <>
          {aztMemoryData && aztMemoryData.length ? (
            aztMemoryData.map((memory) => (
              <MemoryItem key={memory.memorySeq} memory={memory} />
            ))
          ) : (
            <div className="text-center">
              <NotResultLottie />
              <p>추억이 아직 없어요 ㅠㅠ</p>
            </div>
          )}
        </>
      );
    } else {
      if (isAztMemoryLoading || isAztCapsuleLoading) {
        return (
          <div className="flex justify-center align-middle py-60">
            <LoadingLottie />
          </div>
        );
      }

      if (aztCapsuleData && aztCapsuleData.length) {
        return (
          <>
            <div className="grid grid-cols-2 gap-y-3">
              {aztCapsuleData.map((capsule) => (
                <div
                  className={`flex flex-col justify-center items-center ${
                    capsule.openStatus === "EXPIRED"
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  } `}
                  key={capsule.tcSeq}
                >
                  <Image
                    src="/images/capsule.svg"
                    alt="capsuleImg"
                    width="0"
                    height="0"
                    className={`w-1/3 h-auto`}
                    // TODO: EXPIRED 시에는 회색으로 음영 처리
                    onClick={() => handleClickCapsule(capsule)}
                  />
                  <div className="text-sm mt-1">
                    {capsule.openStatus === "OPENED"
                      ? capsule.updatedAt && formatDate(capsule.updatedAt)
                      : showStatus(capsule.openStatus!)}
                  </div>
                </div>
              ))}
            </div>
          </>
        );
      } else {
        return (
          <div className="text-center">
            <NotResultLottie />
            <p>타임캡슐이 없어요 ㅠㅠ</p>
          </div>
        );
      }
    }
  }

  return (
    <>
      <div>
        <div className="flex gap-x-5 justify-between pt-3 pb-5">
          <div className="grow">
            <Textbox
              icon="/icons/users.svg"
              alt="아지트 아이콘"
              bgColor="pink"
              maintext={aztInfoData?.name}
            />
          </div>
          <div className="flex gap-x-2 items-center">
            <Link href={`/${LOCAL.chatting}/${aztInfoData?.chatSeq}`}>
              <Image
                src="/icons/chat.svg"
                alt="아지트 채팅"
                width={20}
                height={20}
              />
            </Link>
            <Link href={`/${API.azt}/${slug}/info`}>
              <Image
                src="/icons/info.svg"
                alt="아지트 상세정보"
                width={20}
                height={20}
              />
            </Link>
          </div>
        </div>
        <ToggleBtn
          textL={`추억앨범 ${
            aztMemoryData ? `(${aztMemoryData?.length})` : ""
          }`}
          textR={`타임캡슐 ${
            aztCapsuleData ? `(${aztCapsuleData?.length})` : ""
          }`}
          imgL="/icons/folder.svg"
          imgR="/icons/folder.svg"
          value={btnValue}
          onChange={handleChange}
        />
        <div className="flex flex-col gap-y-5 px-4 py-6 rounded rounded-t-none border border-t-0 border-black">
          <SelectedContent />
        </div>
        {btnValue ? <MemoryCreateBtn /> : <CapsuleCreateBtn />}
      </div>
      {isModal.is && (
        <Modal
          closeModal={() =>
            setIsModal({
              is: false,
              detail: isModal.detail,
            })
          }
        >
          <AbleTimecaplsuleModal detail={isModal.detail} />
        </Modal>
      )}
    </>
  );
}

export default AzitDetailPage;
