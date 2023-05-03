"use client";

import Btn from "@/components/common/Btn";
import Container from "@/components/common/Container";
import { useAztList } from "@/hooks/queries/azt";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function AzitPage() {
  const router = useRouter();
  const handleBtnClick = () => {
    router.push(`/azit/create`);
  };

  const { data: aztData, isLoading: isAztLoading } = useAztList();
  if (aztData) {
    console.log(aztData);
  }

  return (
    <div className="grid">
      <Btn
        bgColor="yellow"
        text="+ 새 그룹 추가하기"
        btnFunc={handleBtnClick}
        width="w-full"
      />
      <Container
        title
        titleBgColor="blue"
        titleText="내 그룹 목록"
        titleImgSrc="/icons/users.svg"
        titleImgAlt="그룹 아이콘"
      >
        {aztData ? (
          aztData?.map(({ aztSeq, name, image }) => (
            <div key={aztSeq}>
              <div className="relative">
                <Image
                  src="/images/folder.png"
                  alt="폴더 이미지"
                  width={135}
                  height={100}
                />
                <img
                  src={image}
                  alt={`${name} 이미지`}
                  width={80}
                  height={45}
                  className="absolute top-8 left-7 z-10"
                />
              </div>

              <p>{name}</p>
            </div>
          ))
        ) : (
          <p>로딩중...</p>
        )}
      </Container>
    </div>
  );
}

export default AzitPage;
