"use client";
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

export const ViewBaseAnimations = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <>
      <div style={{ height: "150vh" }}>ViewBaseAnimations</div>
      <motion.div
        style={{ height: "100vh", background: "black" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      ></motion.div>
      <div
        ref={ref}
        style={{
          height: "100vh",
          background: isInView ? "red" : "blue",
          transition: "1s background",
        }}
      ></div>
    </>
  );
};
