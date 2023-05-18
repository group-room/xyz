"use client";

import { editAzt } from "@/app/api/azt";
import MyFriendSearchArea from "@/components/azt/MyFriendSearchArea";
import Btn from "@/components/common/Btn";
import ProfileImg from "@/components/common/ProfileImg";
import { LOCAL } from "@/constants/localUrl";
import { API, queryKeys } from "@/constants/queryKeys";
import { useAztInfo } from "@/hooks/queries/azt";
import { useAppSelector } from "@/hooks/redux";
import { SlugProps } from "@/types/common";
import { UserTypes } from "@/types/user";
import { timerSwal } from "@/utils/swalUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function AzitEditPage({ params: { slug } }: SlugProps) {
  const { data: aztInfoData, isLoading: isAztInfoLoading } = useAztInfo(slug);
  const [aztNameInput, setAztNameInput] = useState("");
  const [isFriendInviteOpen, setIsFriendInviteOpen] = useState(false);
  const [newAztPhoto, setNewAztPhoto] = useState<File | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState("");
  const [aztMembers, setAztMembers] = useState<UserTypes[]>([]);
  const handleClickMemberInvite = () => {
    setIsFriendInviteOpen(true);
  };
  const loggedInUserInfo = useAppSelector((state) => state.auth.userInfo);
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (aztInfoData) {
      setAztNameInput(aztInfoData.name);
      setAztMembers(aztInfoData.members);
    }
  }, [aztInfoData]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList: any = e.target.files;
    if (fileList) {
      const photo: File = fileList[0];
      setNewAztPhoto(photo);
      setPreviewPhoto(URL.createObjectURL(photo));
    }
  };

  const useEditAztMutation = useMutation({
    mutationFn: (formData: FormData) => editAzt(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries(queryKeys.azt.aztInfo(slug));
      const aztSeq = data.data.data.aztSeq;
      router.push(`${API.azt}/${aztSeq}`);
    },
  });

  const handleEditAzt = () => {
    if (!aztNameInput) {
      timerSwal("아지트 이름을 입력해주세요!");
      return;
    }
    let membersArr: { userSeq: number }[] = [];
    aztMembers
      .filter((member) => member.userSeq !== loggedInUserInfo?.userSeq)
      .forEach((member) => {
        {
          membersArr.push({ userSeq: member.userSeq });
        }
      });

    const formData = new FormData();
    const stringifiedData = JSON.stringify({
      aztSeq: slug,
      name: aztNameInput,
      members: membersArr,
    });
    const jsonBlob = new Blob([stringifiedData], {
      type: "application/json",
    });
    formData.append("modifyAztRequest", jsonBlob);
    if (newAztPhoto) {
      formData.append("image", newAztPhoto as File);
    } else {
      formData.append("image", new Blob([]));
    }

    useEditAztMutation.mutate(formData);
  };

  if (!isAztInfoLoading && aztInfoData && !isFriendInviteOpen) {
    const { aztSeq, name, createdAt, image, members, chatSeq } = aztInfoData;
    return (
      <div className="flex flex-col gap-y-5">
        <div>
          <div>
            <p>아지트 이름</p>
            <input
              type="text"
              value={aztNameInput}
              onChange={(e) => setAztNameInput(e.target.value)}
              className="w-full border border-black rounded mt-2 px-2 py-1 "
            />
            <div className="flex gap-x-2"></div>
          </div>
        </div>
        <div>
          <p>아지트 대표 사진</p>
          <div className="flex justify-center">
            <label
              htmlFor="input-file"
              className="w-full bg-pink px-5 py-1 rounded border border-black text-center cursor-pointer mt-2"
            >
              {image ? "ヘㅏ진 ㉰시 선택㉭ドブl" : "バr진을 첨부ぁĦ 주パㅔ요"}
            </label>
            <input
              type="file"
              id="input-file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>
          <img
            src={previewPhoto || image} // previewPhoto가 우선
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
              btnFunc={handleClickMemberInvite}
            />
          </div>
        </div>
        <Btn
          width="w-80"
          bgColor="yellow"
          text="편집 완료"
          btnFunc={handleEditAzt}
          className="mx-auto mt-5"
        />
      </div>
    );
  } else if (isFriendInviteOpen) {
    return (
      <MyFriendSearchArea
        slug={slug}
        aztMembers={aztMembers}
        setAztMembers={setAztMembers}
        setIsFriendInviteOpen={setIsFriendInviteOpen}
      />
    );
  }
}

export default AzitEditPage;
