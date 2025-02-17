"use client";
import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";

import MotionPlaygroundContainer from "./container";
import { ContainerRefType } from "./types";
import { SomeText } from "./some-text";

export const SmoothScrollingParallax = () => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;
    const lenis = new Lenis({
      autoRaf: true,
      wrapper: wrapperRef.current,
      content: contentRef.current,
      lerp: 0.05,
    });
  }, []);

  return (
    <MotionPlaygroundContainer
      ref={wrapperRef}
      className="w-[1250px] overflow-y-scroll bg-black relative"
      style={{
        height: CONTAINER_HEIGHT + "px",
      }}
    >
      <div ref={contentRef}>
        <Example containerRef={wrapperRef} />
        <SomeText className="text-white" />
      </div>
    </MotionPlaygroundContainer>
  );
};

const CONTAINER_HEIGHT = 700;
const SECTION_HEIGHT = 1500;

const Example = ({ containerRef }: ContainerRefType) => {
  return (
    <div
      className={`relative w-full`}
      style={{ height: CONTAINER_HEIGHT + SECTION_HEIGHT + "px" }}
    >
      <CenterImage containerRef={containerRef} />
      <ParallaxImages containerRef={containerRef} />
    </div>
  );
};

const CenterImage = ({ containerRef }: ContainerRefType) => {
  const { scrollY } = useScroll({
    container: containerRef,
    layoutEffect: false,
  });

  const clip1 = useTransform(scrollY, [0, SECTION_HEIGHT], [33, 0]);
  const clip2 = useTransform(scrollY, [0, SECTION_HEIGHT], [66, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["200%", "100%"]
  );

  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0.3]
  );

  return (
    <motion.div
      className={`w-full sticky top-0`}
      style={{
        height: `${CONTAINER_HEIGHT}px`,
        backgroundImage: `url(https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize,
        clipPath,
        opacity,
      }}
    ></motion.div>
  );
};

const ParallaxImages = ({ containerRef }: ContainerRefType) => {
  return (
    <div className="mx-auto max-w-xl px-4 pt-[200px]">
      <ParallaxImg
        className="w-1/3"
        src="https://images.unsplash.com/photo-1484704324500-528d0ae4dc7d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="1"
        start={-200}
        end={200}
        containerRef={containerRef}
      />
      <ParallaxImg
        className="mx-auto w-2/3"
        src="https://images.unsplash.com/photo-1551805335-b7c506e1947f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="2"
        start={200}
        end={-250}
        containerRef={containerRef}
      />
      <ParallaxImg
        className="ml-auto w-1/3"
        src="https://images.unsplash.com/photo-1479090793912-eb9929f4fdb2?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="3"
        start={-200}
        end={200}
        containerRef={containerRef}
      />
      <ParallaxImg
        className="ml-24 w-5/12"
        src="https://images.unsplash.com/photo-1603414502662-8b5776fa1be7?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="4"
        start={0}
        end={-500}
        containerRef={containerRef}
      />
    </div>
  );
};

const ParallaxImg = ({
  className,
  alt,
  src,
  start,
  end,
  containerRef,
}: {
  className?: string;
  alt: string;
  src: string;
  start: number;
  end: number;
} & ContainerRefType) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: [`${start}px end`, `end ${end * -1}px`],
    layoutEffect: false,
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};
