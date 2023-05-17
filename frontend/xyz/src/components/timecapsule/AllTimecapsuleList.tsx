import { useOpenCapsuleList } from "@/hooks/queries/capsule";
import { CapsuleAztTypes } from "@/types/capsule";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NotResultLottie from "../lottie/NotResult";
import LoadingLottie from "../lottie/Loading";

type Props = {
  openCapsuleList: CapsuleAztTypes[];
};

export default function AllTimecapsuleList({ openCapsuleList }: Props) {
  const router = useRouter();

  const moveToDetail = (tcSeq: number) => {
    router.push(`/capsule/${tcSeq}`);
  };

  return (
    <div className="flex flex-wrap border-x border-b-2 rounded rounded-t-none border-black p-2">
      {openCapsuleList ? (
        openCapsuleList.length !== 0 ? (
          openCapsuleList.map((list) => {
            return (
              <Image
                key={list.tcSeq}
                src="/images/capsule.svg"
                alt="capsuleImg"
                width="0"
                height="0"
                className="w-1/3 h-auto"
                onClick={() => moveToDetail(list.tcSeq as number)}
              />
            );
          })
        ) : (
          <div className="flex flex-col justify-center items-center h-[60vh]">
            <NotResultLottie width="90%" height="90%" />
            <div className="mt-8 text-lg">열린 타임캡슐이 없습니다</div>
          </div>
        )
      ) : (
        <div>
          <LoadingLottie width="90%" height="90%"/>
        </div>
      )}
    </div>
  );
}
