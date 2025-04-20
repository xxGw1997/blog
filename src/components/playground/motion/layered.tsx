"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import MotionPlaygroundContainer from "./container";
import { ContainerRefType } from "./types";
import { SomeText } from "./some-text";

const Layered = () => {
  const containerRef = useRef(null);
  return (
    <MotionPlaygroundContainer
      ref={containerRef}
      className="w-[1000px] h-[800px] overflow-y-scroll"
    >
      <MultiLayer containerRef={containerRef} />
      <SomeText />
    </MotionPlaygroundContainer>
  );
};

const MultiLayer = ({ containerRef }: ContainerRefType) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ["start start", "end start"],
    layoutEffect: false
  });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "400%"]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);

  return (
    <div
      ref={ref}
      className="w-full h-full overflow-hidden relative grid place-items-center"
    >
      <motion.h1
        className="font-bold pb-96 text-white text-7xl md:text-9xl relative z-10"
        style={{ y: textY }}
      >
        HAPPY ZZW~
      </motion.h1>
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://xxgw1997.oss-cn-hangzhou.aliyuncs.com/mountain-zzw.jpg')`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          y: backgroundY,
        }}
      />
      <motion.div
        className="absolute inset-0 z-20"
        style={{
          backgroundImage: `url('https://xxgw1997.oss-cn-hangzhou.aliyuncs.com/mountain-zzw-bottom.png')`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
};

export default Layered;
