"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import MotionPlaygroundContainer from "../container";
import { ContainerRefType } from "../types";
import { SomeText } from "../some-text";

export const ScrollAnimations = () => {
  const containerRef = useRef(null);

  return (
    <MotionPlaygroundContainer
      ref={containerRef}
      className="overflow-y-scroll overflow-x-hidden relative"
    >
      <Example containerRef={containerRef} />
    </MotionPlaygroundContainer>
  );
};

const Example = ({ containerRef }: ContainerRefType) => {
  const { scrollYProgress } = useScroll({
    container: containerRef,
    layoutEffect: false,
  });

  const scaleX = useSpring(scrollYProgress);

  const background = useTransform(
    scrollYProgress,
    [0, 1],
    ["rgb(86,1,245)", "rgb(1, 245,13)"]
  );
  return (
    <>
      <motion.div
        className="sticky top-0"
        style={{
          background,
          scaleX,
          transformOrigin: "left",
          width: "100%",
          height: "5px",
        }}
      />
      <div style={{ maxWidth: "700px", margin: "auto", padding: "1.2rem" }}>
        <SomeText />
      </div>
    </>
  );
};
