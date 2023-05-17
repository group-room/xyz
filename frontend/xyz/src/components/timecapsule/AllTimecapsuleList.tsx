import { useOpenCapsuleList } from "@/hooks/queries/capsule";
import { CapsuleAztTypes } from "@/types/capsule";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
        <div>로딩중</div>
      )}
    </div>
  );
}
