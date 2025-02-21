"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import MotionPlaygroundContainer from "./container";

export const HoverTiltCard = () => {
  return (
    <MotionPlaygroundContainer className="flex justify-center items-center">
      <Example />
    </MotionPlaygroundContainer>
  );
};

const ROTATION_OFFSET = 18;

const Example = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const coordinate_x = (
      ((e.clientX - rect.left - width / 2) / width) *
      2
    ).toFixed(2);
    const coordinate_y = (
      ((e.clientY - rect.top - height / 2) / height) *
      -2
    ).toFixed(2);

    x.set(Number(coordinate_y) * ROTATION_OFFSET);
    y.set(Number(coordinate_x) * ROTATION_OFFSET);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", transform }}
      className="relative h-96 w-72 rounded-xl bg-indigo-300/50"
    >
      <div
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-yellow-200/80"
      >
        <p style={{transform: 'translateZ(50px)'}}>CONTENT</p>
      </div>
    </motion.div>
  );
};
