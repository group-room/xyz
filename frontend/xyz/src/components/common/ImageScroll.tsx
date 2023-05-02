import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function ImageScroll({ imgList }: { imgList: string[] }) {
  return (
    <>
      <div className="w-full flex overflow-x-auto scrollbar-hide mx-2">
        {/* {imgList.map((imgSrc, idx) => (
        <img key={idx} src={imgSrc} alt="img" width={80} className="mr-1" />
      ))} */}
      </div>
      <div>
        {/* <Carousel
        responsive={responsive}
        swipeable={false}
        draggable={false}
        showDots={true}
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      > */}
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          additionalTransfrom={0}
          arrows
          centerMode={false}
          className=""
          focusOnSelect={false}
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 1,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 1,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          sliderClass=""
          slidesToSlide={1}
        >
          {imgList.map((imgSrc, idx) => (
            <img key={idx} src={imgSrc} alt="img" className="mr-1" />
          ))}
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
        </Carousel>
      </div>
    </>
  );
}

export default ImageScroll;
