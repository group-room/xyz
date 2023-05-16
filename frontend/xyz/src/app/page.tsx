import Image from "next/image";
import Link from "next/link";
import Rectangle from "../../public/icons/rectangle.svg";
import Close from "../../public/icons/close.svg";
import Logo from "../../public/images/logo.svg";
import Kakao from "../../public/icons/kakao.svg";
import Naver from "../../public/icons/naver.svg";
import Google from "../../public/icons/google.svg";
import { BACKEND_URL, SERVER_URL } from "./api/instance";

export default function Home() {
  return (
    <section>
      <div className="flex flex-row-reverse py-3 gap-2 pr-2 rounded-t-md fixed top-0 left-0 border border-black bg-blue w-full ">
        <div>
          <Image src={Close} alt="닫기" width={20} height={20} />
        </div>
        <div>
          <Image src={Rectangle} alt="최대화" width={20} height={20} />
        </div>
        <div className=" border-b-2 border-black w-5 "></div>
      </div>

      <div className=" mt-60 mb-28 flex justify-center w-full h-full">
        <Image src={Logo} alt="로고" width={234} height={80} />
      </div>
      <div className=" flex flex-col gap-8 justify-center items-center ">
        <Link href={`${SERVER_URL}${BACKEND_URL}/user/login/kakao`}>
          <div className=" flex flex-row justify-center items-center gap-4 w-[255px] h-[66px] rounded-[5px] bg-[#fddc3f] border border-black">
            <div>
              <Image src={Kakao} alt="카카오 로고" width={30} height={30} />
            </div>
            <div className="text-xl text-black">카카오 로그인</div>
          </div>
        </Link>
        <Link href={`${SERVER_URL}${BACKEND_URL}/user/login/naver`}>
          <div className="flex flex-row justify-center items-center gap-4 w-[255px] h-[66px] rounded-[5px] bg-[#1dc800] border border-black">
            <div>
              <Image src={Naver} alt="네이버 로고" width={30} height={30} />
            </div>
            <div className="text-xl  text-white">네이버 로그인</div>
          </div>
        </Link>
        <Link href={`${SERVER_URL}${BACKEND_URL}/user/login/google`}>
          <div className="flex flex-row justify-center items-center gap-4 w-[255px] h-[66px] rounded-[5px] bg-white border border-black">
            <div>
              <Image src={Google} alt="구글 로고" width={22} height={22} />
            </div>
            <div className="text-xl  text-black">구글 로그인</div>
          </div>
        </Link>
      </div>
    </section>
  );
}
