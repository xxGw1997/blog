"use client";
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import MotionPlaygroundContainer from "../container";
import { ContainerRefType } from "../types";

export const ViewBaseAnimations = () => {
  const containerRef = useRef(null);

  return (
    <MotionPlaygroundContainer
      ref={containerRef}
      className="overflow-y-scroll h-[500px]"
    >
      <Example containerRef={containerRef} />
    </MotionPlaygroundContainer>
  );
};

const Example = ({ containerRef }: ContainerRefType) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    root: containerRef,
  });
  return (
    <>
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
    </>
  );
};
