import Image from "next/image";
import unableCapsuleImg from '../../../public/images/unableCapsule.svg'

export default function UnbleTimecaplsuleModal() {
  return (
    <div className="flex flex-col items-center justify-center my-8 mx-4 w-72">
      <h1 className="text-2xl mb-4">[그룹명]</h1>
      <h1 className="text-2xl mb-4">n번째 타임캡슐</h1>
      <p className="text-lg mb-4">2023.04.27</p>
      <h4 className="text-lg mb-8">서울시 강남구 테헤란로</h4>
      <Image className="mb-8" src={unableCapsuleImg} alt="unableCapsuleImg"></Image>
      <div className="flex">
        <div className="w-6 h-6 rounded-full bg-pink mr-2"></div>
        <div className="w-6 h-6 rounded-full bg-pink mr-2"></div>
        <div className="w-6 h-6 rounded-full bg-pink mr-2"></div>
        <div className="w-6 h-6 rounded-full bg-pink mr-2"></div>
      </div>
    </div>
  );
}

