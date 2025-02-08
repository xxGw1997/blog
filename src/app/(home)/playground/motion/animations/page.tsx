import React from "react";
import { AnimationControls } from "~/components/playground/motion/animations/animation-controls";
import { ScrollAnimations } from "~/components/playground/motion/animations/scroll-animations";
import { UseAnimation } from "~/components/playground/motion/animations/use-animation";
import { ViewBaseAnimations } from "~/components/playground/motion/animations/view-base-animations";

const MotionPlayground = () => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-10 py-20">
      <AnimationControls />
      <UseAnimation />
      <ViewBaseAnimations />
      <ScrollAnimations />
    </div>
  );
};

export default MotionPlayground;
