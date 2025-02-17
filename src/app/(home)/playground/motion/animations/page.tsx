import React from "react";
import { AnimationControls } from "~/components/playground/motion/animations/animation-controls";
import { ScrollAnimations } from "~/components/playground/motion/animations/scroll-animations";
import { UseAnimation } from "~/components/playground/motion/animations/use-animation";
import { ViewBaseAnimations } from "~/components/playground/motion/animations/view-base-animations";
import { HoverTiltCard } from "~/components/playground/motion/hover-tilt-card";
import { SmoothScrollingParallax } from "~/components/playground/motion/smooth-scrolling-parallax";
import { SvgAnimation } from "~/components/playground/motion/svg-animation";

const MotionPlayground = () => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-10 py-20">
      <SvgAnimation />
      <HoverTiltCard />
      <SmoothScrollingParallax />
      <AnimationControls />
      <UseAnimation />
      <ViewBaseAnimations />
      <ScrollAnimations />
    </div>
  );
};

export default MotionPlayground;
