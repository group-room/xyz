import Image from "next/image";
import Link from "next/link";

import Logo from "../../public/images/logo.svg";
import Kakao from "../../public/icons/kakao.svg";
import Naver from "../../public/icons/naver.svg";
import Google from "../../public/icons/google.svg";
import { BACKEND_URL, SERVER_URL } from "./api/instance";
import BrowserHeader from "@/components/common/BrowserHeader";

export default function Home() {
  return (
    <section>
      <BrowserHeader />
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
