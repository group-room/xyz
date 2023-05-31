import React from "react";

function ImageScroll({ imgList }: { imgList: string[] }) {
  return (
    <>
      <div className="w-full flex overflow-x-auto scrollbar-hide mx-2">
        {imgList.map((imgSrc, idx) => (
          <img key={idx} src={imgSrc} alt="img" className="mr-1" />
        ))}
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
      </div>
    </>
  );
}

export default ImageScroll;
