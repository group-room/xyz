"use client";

import React from "react";
import Link from "next/link";
import AztItem from "@/components/azt/AztItem";
import Container from "@/components/common/Container";
import { useAztList } from "@/hooks/queries/azt";
import LoadingLottie from "@/components/lottie/Loading";
import NotResultLottie from "@/components/lottie/NotResult";

function AztPage() {
  const { data: aztData, isLoading: isAztLoading } = useAztList();

  return (
    <div className="flex flex-col gap-y-6">
      <div className="w-full mt-2">
        <Link
          href="/azt/create"
          className="block w-full bg-yellow pl-5 py-3 border border-black rounded text-lg"
        >
          + 새 아지트 만들기
        </Link>
      </div>
      <Container
        title
        titleBgColor="blue"
        titleText="내 아지트 목록"
        titleImgSrc="/icons/users.svg"
        titleImgAlt="아지트 아이콘"
      >
        {aztData ? (
          aztData.length ? (
            <div className="grid grid-cols-2">
              {aztData?.map(({ aztSeq, name, image }) => (
                <AztItem
                  key={aztSeq}
                  aztSeq={aztSeq}
                  name={name}
                  image={image}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center py-2 w-full text-center">
              <NotResultLottie />
              아지트가 없어요 ㅠㅠ
            </div>
          )
        ) : (
          <LoadingLottie />
        )}
      </Container>
    </div>
  );
}

export default AztPage;
