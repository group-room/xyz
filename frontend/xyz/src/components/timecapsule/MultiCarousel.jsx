"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import { DotProps } from "react-multi-carousel/lib/types";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 390, min: 0 },
    items: 1,
  },
};

const CustomDot = ({ onClick, active }) => {
  return (
    <div
      className={`${
        active ? "bg-blue" : "inactive"
      } w-3 h-3 rounded-full border border-pink mx-1 cursor-pointer`}
      onClick={() => onClick()}
    ></div>
  );
};

export default function MultiCarousel({ children }) {
  return (
    <div className="pb-7 relative">
      <Carousel
        infinite
        autoPlay
        showDots
        renderDotsOutside
        customDot={<CustomDot />}
        responsive={responsive}
        itemClass="flex justify-center items-center"
      >
        {children}
      </Carousel>
    </div>
  );
}
