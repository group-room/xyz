import Image from "next/image";
import Link from "next/link";
import React from "react";

function CapsuleCreateBtn() {
  return (
    <button
      type="button"
      className="fixed flex flex-col align-middle justify-center z-20 bottom-20 bg-white right-5 w-16 h-16 rounded-full shadow-md text-center"
    >
      <Link href="/capsule/create" className="inline-block mx-auto">
        <Image
          src="/images/capsule.svg"
          alt="캡슐 만들기"
          width={30}
          height={30}
        />
      </Link>
    </button>
  );
}

export default CapsuleCreateBtn;
