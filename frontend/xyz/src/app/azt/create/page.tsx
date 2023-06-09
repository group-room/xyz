"use client";

import { createAzt } from "@/app/api/azt";
import MyFriendSearchArea from "@/components/azt/MyFriendSearchArea";
import Btn from "@/components/common/Btn";
import ProfileImg from "@/components/common/ProfileImg";
import { API } from "@/constants/queryKeys";
import { useAppSelector } from "@/hooks/redux";
import useInput from "@/hooks/useInput";
import { UserTypes } from "@/types/user";
import { timerSwal } from "@/utils/swalUtils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function AzitCreatePage() {
  const [aztNameInput, onChangeAztNameInput] = useInput("");
  const [aztPhoto, setAztPhoto] = useState<File | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState("");
  const [aztMembers, setAztMembers] = useState<UserTypes[]>([]);
  const router = useRouter();
  const state = useAppSelector((state) => state);
  const loggedInUserInfo = state.auth.userInfo;
  const [isFriendInviteOpen, setIsFriendInviteOpen] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList: any = e.target.files;
    if (fileList) {
      const photo: File = fileList[0];
      setAztPhoto(photo);
      setPreviewPhoto(URL.createObjectURL(photo));
    }
  };

  const useCreateAztMutation = useMutation({
    mutationFn: (formData: FormData) => createAzt(formData),
    onSuccess: (data) => {
      const aztSeq = data.data.data.aztSeq;
      router.push(`${API.azt}/${aztSeq}`);
    },
  });

  const handleClickMemberInvite = () => {
    setIsFriendInviteOpen(true);
  };

  const handleClickCreate = () => {
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
      name: aztNameInput,
      members: membersArr,
    });
    const jsonBlob = new Blob([stringifiedData], {
      type: "application/json",
    });
    formData.append("addAztRequest", jsonBlob);
    if (aztPhoto) {
      formData.append("image", aztPhoto as File);
    } else {
      formData.append("image", new Blob([]));
    }

    useCreateAztMutation.mutate(formData);
  };

  useEffect(() => {
    if (
      loggedInUserInfo &&
      !aztMembers.find((member) => member.userSeq === loggedInUserInfo.userSeq)
    ) {
      setAztMembers([loggedInUserInfo]);
    }
  }, []);

  return (
    <div>
      {!isFriendInviteOpen ? (
        <div>
          <h2 className="text-lg mb-3">새 아지트 만들기</h2>
          <div className="flex flex-col gap-y-5">
            <div>
              <p>아지트 이름</p>
              <input
                type="text"
                autoFocus
                value={aztNameInput}
                onChange={onChangeAztNameInput}
                className="w-full border border-black rounded mt-2 px-2 py-1"
              />
            </div>
            <div>
              <p>
                아지트 프로필 사진 <span className="text-sm">(선택)</span>
              </p>
              <div className="w-full">
                <label
                  htmlFor="input-file"
                  className="w-full block bg-pink py-1 rounded border border-black text-center cursor-pointer mt-2"
                >
                  {aztPhoto
                    ? "ヘㅏ진 ㉰시 선택㉭ドブl"
                    : "バr진을 첨부ぁĦ 주パㅔ요"}
                </label>
                <input
                  type="file"
                  id="input-file"
                  accept="image/jpeg, image/png"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </div>
              {previewPhoto && (
                <div className="my-5 mx-auto text-center">
                  <img
                    src={previewPhoto}
                    alt="아지트 프로필 사진 미리보기"
                    className="rounded border-2 border-black object-contain text-center max-w-full my-0 mx-auto"
                  />
                </div>
              )}
            </div>
            <div>
              <p>아지트 멤버</p>
              <div className="my-3 mx-auto text-center">
                <div className="flex text-center gap-x-3 justify-center">
                  {aztMembers.map(({ userSeq, profileImage }) => (
                    <div key={userSeq}>
                      <ProfileImg imgSrc={profileImage} />
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <Btn
                    bgColor="blue"
                    text="멤버 초대하기"
                    btnFunc={handleClickMemberInvite}
                  />
                </div>
              </div>
            </div>
            <div>
              <Btn
                bgColor="yellow"
                text="아지트 생성하기"
                btnFunc={handleClickCreate}
                padding="py-2"
                className="w-full mt-5"
              />
            </div>
          </div>
        </div>
      ) : (
        <MyFriendSearchArea
          slug={0} // 생성시에는 0 넘기기
          aztMembers={aztMembers}
          setAztMembers={setAztMembers}
          setIsFriendInviteOpen={setIsFriendInviteOpen}
        />
      )}
    </div>
  );
}

export default AzitCreatePage;
