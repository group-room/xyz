import { useOpenCapsuleList } from "@/hooks/queries/capsule";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AllTimecapsuleList() {
  const router = useRouter();

  const { data: openCapsuleList, isLoading } = useOpenCapsuleList();
  if (openCapsuleList) {
    console.log("open capsule list");
    console.log(openCapsuleList);
  }

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
              onClick={() => moveToDetail(list.tcSeq)}
            />
          );
        })
      ) : (
        <div>로딩중</div>
      )}
    </div>
  );
}
