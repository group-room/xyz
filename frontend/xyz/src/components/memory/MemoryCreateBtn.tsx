import Image from "next/image";
import React from "react";
import addCamera from "../../../public/icons/add-camera.svg";

function MemoryCreateBtn() {
  return (
    <button
      type="button"
      className="fixed flex flex-col align-middle justify-center z-20 bottom-20 right-5 w-16 h-16 rounded-full shadow-md text-center"
    >
      <a href="/memory/create" className="inline-block mx-auto">
        <Image src={addCamera} alt="추억 만들기" width={30} />
      </a>
    </button>
  );
}

export default MemoryCreateBtn;
