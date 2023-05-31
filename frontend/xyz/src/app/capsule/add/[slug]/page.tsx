"use client";

import Btn from "@/components/common/Btn";
import React, { useEffect, useState } from "react";
import CapsulePhotoUpload from "@/components/timecapsule/CapsulePhotoUpload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEYS } from "@/constants/queryKeys";
import { postContentCapsule } from "@/app/api/capsule";
import { useRouter } from "next/navigation";
import { confirmSwal } from "../../../../utils/swalUtils";

type Props = {
  params: {
    slug: number;
  };
};

export default function TimeCapsuleCreatePage({ params: { slug } }: Props) {
  const router = useRouter();

  const [content, setContent] = useState<string>("");

  const queryClient = useQueryClient();
  const useCreateCapsuleMutation = useMutation({
    mutationFn: (formData: FormData) => postContentCapsule(slug, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.capsule);
    },
  });

  const [photos, setPhotos] = useState<File[]>([]); // 업로드한 사진 파일들
  const [photoPreviewList, setPhotoPreviewList] = useState<string[]>([]); // 사진 미리보기용

  // 타임 캡슐 생성 폼 제출
  const handleSubmitCapsule = (e?: React.FormEvent): void => {
    e!.preventDefault();

    const formData = new FormData();
    const stringifiedData = JSON.stringify({
      content: content,
    });
    const jsonData = new Blob([stringifiedData], {
      type: "application/json",
    });
    // 음성이든 비디오든 할 경우...
    // const videofile = new File([videoFiles], "videoFile.webm", {
    //   type: "video/webm",
    // });
    formData.append("addTcContentRequest", jsonData);
    photos.forEach((photo) => {
      formData.append("images", photo);
    });

    useCreateCapsuleMutation.mutate(formData, {
      onSuccess: (data) => {
        const tcSeq = data.data.data.tcSeq;
        confirmSwal("타임캡슐 내용이 추가되었습니다!");
        router.push(`/capsule`);
      },
    });
  };
  return (
    <div>
      <h2 className="text-xl">타임캡슐 내용 추가하기</h2>
      <form
        action=""
        className="flex flex-col justify-center align-middle gap-y-5 mt-5"
        onSubmit={handleSubmitCapsule}
      >
        <CapsulePhotoUpload
          isAdd={true}
          photos={photos}
          setPhotos={setPhotos}
          photoPreviewList={photoPreviewList}
          setPhotoPreviewList={setPhotoPreviewList}
        />
        <textarea
          rows={3}
          className="border rounded border-black p-2 resize-none"
          placeholder="추억을 작성ぁĦ주パㅔ요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <Btn
          width="w-full"
          bgColor="yellow"
          text="등&nbsp;&nbsp;록"
          btnFunc={handleSubmitCapsule}
        />
      </form>
    </div>
  );
}
