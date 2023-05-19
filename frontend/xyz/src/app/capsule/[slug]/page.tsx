"use client";

import { useDetailCapsule } from "@/hooks/queries/capsule";
import Textbox from "@/components/common/Textbox";
import Container from "@/components/common/Container";
import MultiCarousel from "@/components/timecapsule/MultiCarousel";

type Props = {
  params: {
    slug: string;
  };
};

export default function TimeCapsuleDetailPage({ params: { slug } }: Props) {
  const { data: capsuleDetail, isLoading } = useDetailCapsule(slug);

  const formatDate = (dateString: string) => {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(5, 7);
    const day = dateString.slice(8, 10);
    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <div>
      <h2 className="mb-4 text-lg">타임캡슐 상세 보기</h2>
      {capsuleDetail ? (
        <div>
          <Textbox
            icon={"/icons/users.svg"}
            alt={"그룹 아이콘"}
            maintext={capsuleDetail.tc.aztName}
            bgColor="pink"
            maintextClass="text-sm flex justify-center items-center"
          />
          <Textbox
            icon={"/icons/calendar.svg"}
            alt={"캘린더 아이콘"}
            maintext={formatDate(capsuleDetail.tc.openedAt)}
            maintextClass="text-sm flex justify-center items-center"
          />
          <Textbox
            icon={"/icons/pin.svg"}
            alt={"달력 아이콘"}
            firstClass={"border border-black flex my-2"}
            secondClass={
              "flex items-center justify-center mx-1 pr-1 border-black"
            }
            maintext={capsuleDetail.tc.location}
            maintextClass="text-sm flex justify-center items-center border-l border-black"
          />
          <Container
            title
            titleText={"타임캡슐 사진"}
            titleImgSrc={"/icons/images.svg"}
            titleImgAlt={"사진 아이콘"}
          >
            <div className="flex flex-col gap-y-2 p-2">
              <MultiCarousel>
                {capsuleDetail.contents.map((content) => {
                  return content.files.map((file, idx) => {
                    return <img key={idx} src={file.filePath} alt="image" />;
                  });
                })}
              </MultiCarousel>
            </div>
          </Container>
          {capsuleDetail.contents.map((item, idx) => {
            return (
              <div className="mt-2 border border-black rounded-sm p-2 mb-2">
                <div key={idx}>{item.content}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>로딩중</div>
      )}
    </div>
  );
}
