'use client'

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 390, min: 0 },
    items: 1
  }
};
<Carousel responsive={responsive}>
  <div>Item 1</div>
  {/* <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
  <div>Item 5</div>
  <div>Item 6</div>
  <div>Item 7</div>
  <div>Item 8</div>
  <div>Item 9</div>
  <div>Item 10</div> */}
</Carousel>;

type Props = {
  children: React.ReactNode;
}

export default function MultiCarousel({children}: Props) {
  return (
    <Carousel infinite autoPlay responsive={responsive} itemClass="my-4 pl-7">
      {children}
    </Carousel>
  );
}