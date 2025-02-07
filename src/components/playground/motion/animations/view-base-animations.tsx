"use client";
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import MotionPlaygroundContainer from "../container";

export const ViewBaseAnimations = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, {
    root: containerRef,
  });

  return (
    <MotionPlaygroundContainer
      ref={containerRef}
      className="overflow-y-scroll h-[500px]"
    >
      <div style={{ height: "150vh" }}>ViewBaseAnimations</div>
      <motion.div
        style={{ height: "500px", background: "black" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      ></motion.div>
      <div
        ref={ref}
        style={{
          height: "500px",
          background: isInView ? "red" : "blue",
          transition: "1s background",
        }}
      ></div>
    </MotionPlaygroundContainer>
  );
};
