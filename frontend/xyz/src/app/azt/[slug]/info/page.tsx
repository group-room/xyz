"use client";

import { withdrawAzt } from "@/app/api/azt";
import MyFriendSearchArea from "@/components/azt/MyFriendSearchArea";
import Btn from "@/components/common/Btn";
import ModalBtn from "@/components/common/ModalBtn";
import ProfileImg from "@/components/common/ProfileImg";
import Textbox from "@/components/common/Textbox";
import LoadingLottie from "@/components/lottie/Loading";
import { LOCAL } from "@/constants/localUrl";
import { API, queryKeys } from "@/constants/queryKeys";
import { useAztInfo } from "@/hooks/queries/azt";
import { SlugProps } from "@/types/common";
import { UserTypes } from "@/types/user";
import { confirmSwal } from "@/utils/swalUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function AztInfoPage({ params: { slug } }: SlugProps) {
  const { data: aztInfoData, isLoading: isAztInfoLoading } = useAztInfo(slug);
  const [isModal, setIsModal] = useState(false);
  const [isFriendInviteOpen, setIsFriendInviteOpen] = useState(false);
  const [aztMembers, setAztMembers] = useState<UserTypes[]>([]);

  const router = useRouter();
  const queryClient = useQueryClient();
  const useAztWithDrawMutation = useMutation({
    mutationFn: () => withdrawAzt(slug),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.azt.aztInfo(slug));
      confirmSwal("아지트에서 탈퇴되었습니다.");
      router.push(API.azt);
    },
  });

  useEffect(() => {
    if (aztInfoData) {
      setAztMembers(aztInfoData.members);
    }
  }, [aztInfoData]);

  const handleClickInvite = () => {
    setIsFriendInviteOpen(true);
  }; // TODO: 멤버 초대하기 링크 연결
  const handleClickWithdraw = () => {
    setIsModal(true);
  };
  const handleClickModalYes = () => {
    useAztWithDrawMutation.mutate();
  };

  if (isAztInfoLoading) {
    return (
      <div className="flex justify-center align-middle py-60">
        <LoadingLottie />
      </div>
    );
  }

  if (!aztInfoData) {
    return notFound();
  }

  if (aztInfoData) {
    const { aztSeq, name, createdAt, image, members, chatSeq } = aztInfoData;
    return (
      <>
        {!isFriendInviteOpen ? (
          <>
            <div className="flex flex-col gap-y-1">
              <div>
                <div className="flex justify-between mb-1">
                  <p>아지트 이름</p>
                  <div className="flex gap-x-2">
                    <Link href={`/${LOCAL.chatting}/${chatSeq}`}>
                      <Image
                        src="/icons/chat.svg"
                        alt="채팅 아이콘"
                        width={20}
                        height={15}
                      />
                    </Link>
                    <Link href={`/${API.azt}/${aztSeq}/edit`}>
                      <Image
                        src="/icons/edit.svg"
                        alt="편집 아이콘"
                        width={18}
                        height={18}
                      />
                    </Link>
                  </div>
                </div>
                <Textbox
                  icon="/icons/users.svg"
                  alt="아지트 아이콘"
                  maintext={name}
                  bgColor="pink"
                />
              </div>
              <div>
                <p>아지트 생성일</p>
                <Textbox
                  icon="/icons/calendar.svg"
                  alt="날짜 아이콘"
                  maintext={createdAt}
                />
              </div>
              <div>
                <p>아지트 대표 사진</p>
                <img
                  src={image}
                  alt={name}
                  className="rounded border-2 border-black mt-2 mx-auto"
                />
              </div>
              <div className="flex flex-col gap-y-2 my-2">
                <p>아지트 멤버</p>
                <div className="flex text-center gap-x-3 justify-center">
                  {aztMembers.map(({ userSeq, profileImage }) => (
                    <div key={userSeq}>
                      <Link href={`/${LOCAL.profile}/${userSeq}`}>
                        <ProfileImg imgSrc={profileImage} />
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="my-3 mx-auto">
                  <Btn
                    bgColor="blue"
                    text="멤버 초대하기"
                    btnFunc={handleClickInvite}
                  />
                </div>
              </div>
              <div className="text-right mt-16">
                <Btn
                  bgColor="blue"
                  className="bg-neutral-200"
                  text="탈퇴하기"
                  btnFunc={handleClickWithdraw}
                />
              </div>
            </div>
            {isModal && (
              <ModalBtn
                yesFunc={handleClickModalYes}
                closeModal={() => setIsModal(false)}
                text="아지트에서 탈퇴할까요?"
              />
            )}
          </>
        ) : (
          <MyFriendSearchArea
            slug={aztSeq!}
            aztMembers={aztMembers}
            setAztMembers={setAztMembers}
            setIsFriendInviteOpen={setIsFriendInviteOpen}
            isDirectFriendInvite={true}
          />
        )}
      </>
    );
  }
}

export default AztInfoPage;
