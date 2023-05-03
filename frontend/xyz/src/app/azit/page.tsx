"use client";

import Btn from "@/components/common/Btn";
import Container from "@/components/common/Container";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function AzitPage() {
  const router = useRouter();
  const handleBtnClick = () => {
    router.push(`/azit/create`);
  };

  return (
    <div>
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
        <div>
          <Image
            src="/images/folder.png"
            alt="폴더 이미지"
            width={135}
            height={100}
          />
        </div>
      </Container>
    </div>
  );
}

export default AzitPage;
