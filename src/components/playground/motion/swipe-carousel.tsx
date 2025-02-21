"use client";

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, useMotionValue } from "motion/react";
import MotionPlaygroundContainer from "./container";
import { cn } from "~/lib/utils";

export const SwipeCarousel = () => {
  return (
    <MotionPlaygroundContainer className="w-[900px] h-auto overflow-hidden">
      <Example />
    </MotionPlaygroundContainer>
  );
};

// 拖动超过该值，则触发滑动
export const DRAG_X_BUFFER = 70;

export const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

const DELAY_TIME = 1000 * 10;

const Example = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const dragX = useMotionValue(0);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setImgIndex((prev) => {
          if (prev === imgs.length - 1) {
            return 0;
          }
          return prev + 1;
        });
      }
    }, DELAY_TIME);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleDragEnd = () => {
    // less than 0 -> next, more than 0 -> prev
    const slideX = dragX.get();
    if (slideX <= -DRAG_X_BUFFER && imgIndex < imgs.length - 1) {
      setImgIndex((prev) => prev + 1);
    } else if (slideX >= DRAG_X_BUFFER && imgIndex > 0) {
      setImgIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="relative h-full overflow-hidden bg-black">
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        style={{
          x: dragX,
        }}
        onDragEnd={handleDragEnd}
        className="flex cursor-grab items-center active:cursor-grabbing"
      >
        <Images imgIndex={imgIndex} />
      </motion.div>
      <Dots
        imgIndex={imgIndex}
        setImgIndex={setImgIndex}
        className="absolute bottom-5 z-10"
      />
      <GradientEdges />
    </div>
  );
};

const imgs = [
  "https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1615412704911-55d589229864?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1661962862470-a03bcc2fb415?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1601961794652-ff5d8deec237?q=80&w=2087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1571301092535-61a418b457dd?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1589194858175-92ffb8ff1d92?q=80&w=2085&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const Images = ({ imgIndex }: { imgIndex: number }) => {
  return (
    <>
      {imgs.map((src, idx) => (
        <motion.div
          key={idx}
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          animate={{
            scale: imgIndex === idx ? 0.95 : 0.85,
          }}
          transition={SPRING_OPTIONS}
          className="aspect-[16/9] w-full shrink-0 rounded-xl bg-neutral-800 object-cover"
        />
      ))}
    </>
  );
};

const Dots = ({
  imgIndex,
  setImgIndex,
  className,
}: {
  className: string;
  imgIndex: number;
  setImgIndex: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className={cn("w-full mt-4 flex justify-center gap-2", className)}>
      {imgs.map((_, idx) => (
        <button
          key={idx}
          onClick={(e) => {
            e.stopPropagation();
            setImgIndex(idx);
          }}
          className={`size-3 rounded-full transition-colors ${
            idx === imgIndex ? "bg-neutral-50" : "bg-neutral-500"
          }`}
        />
      ))}
    </div>
  );
};

const GradientEdges = () => {
  return (
    <>
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-neutral-950/50 to-neutral-950/0" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-neutral-950/50 to-neutral-950/0" />
    </>
  );
};
