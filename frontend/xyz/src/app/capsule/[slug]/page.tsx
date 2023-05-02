// import MultiCarousel from "@/components/timecapsule/MultiCarousel";
// import TimeCapsulePhotoList from "@/components/timecapsule/TimeCapsulePhotoList";
// import Image from "next/image";

// type Props = {
//   params: {
//     slug: string;
//   }
// }

// export default function TimeCapsuleDetailPage({params: {slug}} : Props) {
//   const imgList:number[] = [
//     1, 2, 5,6, 7, 8, 9, 10
//   ]

//   return (
//     <div >
//       <h2 className="mb-4 text-xl font-semibold">타임캡슐 상세 보기</h2>
//       <div className="flex bg-pink border-2 border-black rounded-md h-10 mb-4">
//         <div className="flex items-center justify-center mx-2 pr-1 border-r-2 border-black w-12 h-full"><Image src="/icons/users-white.svg" alt="users" width={20} height={20}/></div>
//         <div className="flex items-center justify-center text-white text-lg">Øŀㅉl들∽Ŀŀㅍrㄹざㄱł죠Øŀ咬Й</div>
//       </div>

//       <div className="flex border-2 border-black rounded-md h-10 mb-4">
//         <div className="flex items-center justify-center mx-2 pr-1 border-r-2 border-black w-12 h-full"><Image src="/icons/calendar.svg" alt="users" width={20} height={20}/></div>
//         <div className="flex items-center justify-center text-lg">2023.04.28</div>
//       </div>

//       <div className="flex border-2 border-black rounded-md h-10 mb-4">
//         <div className="flex items-center justify-center mx-2 pr-1 border-r-2 border-black w-12 h-full"><Image src="/icons/flag.svg" alt="users" width={20} height={20}/></div>
//         <div className="flex items-center justify-center text-sm">서울특별시 강남구 역삼동 테헤란로 212</div>
//       </div>

//       <div>
//         <div className="flex bg-yellow h-10 border-2 border-black rounded-t-md">
//           <Image className="mx-4" src="/icons/image.svg" alt="users" width={20} height={20}/>
//           <div className="flex items-center justify-center">추억 사진</div>
//         </div>
//         <div className="h-[40vh] border-x-2 border-b-2 border-black rounded-b-md mb-4">
//           <MultiCarousel >
//             {imgList.map((list, idx) => <Image key={idx} src={`/images/photos/img${list}.jpg`} alt="img" width={290} height={100} />)}
//           </MultiCarousel>
//           <TimeCapsulePhotoList />
//         </div>
//         <div className="h-[10vh] p-2 border-black border-2 rounded-md">형님들 보고싶슴다~! 저희 이사진 찍은지 벌써 20년됐는데 강남에서 함 만나죠잉~</div>
//       </div>
//     </div>
//   );
// }
