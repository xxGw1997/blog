import React from "react";
import { HorizontalScrollCarousel } from "~/components/playground/motion/horizontal-scroll";
import { SwipeCarousel } from "~/components/playground/motion/swipe-carousel";

const HorizontalScroll = () => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-10 py-20">
      <SwipeCarousel />
      <HorizontalScrollCarousel />
    </div>
  );
};

export default HorizontalScroll;
