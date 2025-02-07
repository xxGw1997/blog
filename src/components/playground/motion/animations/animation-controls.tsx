"use client";

import React from "react";
import { motion, useAnimationControls } from "motion/react";
import { Button } from "~/components/ui/button";
import MotionPlaygroundContainer from "../container";

export const AnimationControls = () => {
  const flipControl = useAnimationControls();

  const handleClick = () => {
    flipControl.start("flip");
  };

  return (
    <MotionPlaygroundContainer className="flex justify-center items-center">
      <div
        style={{
          display: "grid",
          placeContent: "center",
          gap: "0.8rem",
        }}
      >
        <Button onClick={handleClick}>翻转</Button>
        <motion.div
          style={{ width: 150, height: 150, background: "black" }}
          variants={{
            initial: {
              rotate: "0deg",
            },
            flip: {
              rotate: "360deg",
              transition: {
                duration: 2,
              },
            },
          }}
          whileHover="flip"
          initial="initial"
          animate={flipControl}
        ></motion.div>
      </div>
    </MotionPlaygroundContainer>
  );
};
