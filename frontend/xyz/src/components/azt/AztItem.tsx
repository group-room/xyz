import { AztTypes } from "@/types/azt";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function AztItem({ aztSeq, name, image }: AztTypes) {
  return (
    <div className="my-0 mx-auto p-4">
      <Link href={`/azt/${aztSeq}`}>
        <div className="relative">
          <img
            src="/images/folder.png"
            alt="폴더 이미지"
            width={135}
            height={100}
          />
          <div className="absolute top-1/3 left-4 z-10 w-3/4 h-1/2 max-h-[50%] text-center">
            <img
              src={image}
              alt={`${name} 이미지`}
              className="max-h-11 object-fit object-center overflow-hidden mx-auto my-0"
            />
          </div>
        </div>
      </Link>
      <p className="pl-1">{name}</p>
    </div>
  );
}

export default AztItem;
