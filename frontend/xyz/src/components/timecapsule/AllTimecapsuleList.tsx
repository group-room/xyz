import Image from "next/image";

export default function AllTimecapsuleList() {
  return (
    <div className="grid grid-cols-3 gap-2 grid-flow-dense h-[100vh] border-x border-b-2 rounded rounded-t-none border-black p-2">
      <Image
        src="/images/capsule.svg"
        alt="capsuleImg"
        width="0"
        height="0"
        className="w-full h-auto"
      />
      <Image
        src="/images/capsule.svg"
        alt="capsuleImg"
        width="0"
        height="0"
        className="w-full h-auto"
      />
      <Image
        src="/images/capsule.svg"
        alt="capsuleImg"
        width="0"
        height="0"
        className="w-full h-auto"
      />
      <Image
        src="/images/capsule.svg"
        alt="capsuleImg"
        width="0"
        height="0"
        className="w-full h-auto"
      />
    </div>
  );
}
