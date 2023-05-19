import Image from "next/image";

export default function TimeCapsulePhotoList() {
  const imgList:number[] = [
    1, 2, 5,6, 7, 8, 9, 10
  ]

  return (
    <div className="flex overflow-x-auto scrollbar-hide mx-2">
      {imgList.map((list, idx) => <Image key={idx} src={`/images/photos/img${list}.jpg`} alt="img" width={80} height={80} className="mr-1"/>)}

    </div>
  );
}

