"use client";

import { motion, useTransform, useScroll } from "motion/react";
import { useRef } from "react";
import MotionPlaygroundContainer from "./container";
import { ContainerRefType } from "./types";

export const Example = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  return (
    <MotionPlaygroundContainer
      ref={containerRef}
      className="w-[500px] h-[500px] overflow-y-scroll"
    >
      <div className="bg-neutral-800">
        <div className="flex h-48 items-center justify-center">
          <span className="font-semibold uppercase text-neutral-500">
            Scroll down
          </span>
        </div>
        <HorizontalScrollCarousel containerRef={containerRef} />
        <div className="flex h-48 items-center justify-center">
          <span className="font-semibold uppercase text-neutral-500">
            Scroll up
          </span>
        </div>
      </div>
    </MotionPlaygroundContainer>
  );
};

const HorizontalScrollCarousel = ({ containerRef }: ContainerRefType) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    container: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[1500px] bg-neutral-900">
      <div className="sticky top-0 flex h-[500px] items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: CardType }) => {
  const color = `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
    Math.random() * 255
  )}, ${Math.ceil(Math.random() * 255)})`;
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundColor: color,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </div>
  );
};

type CardType = {
  title: string;
  id: number;
};

const cards: CardType[] = [
  {
    title: "Title 1",
    id: 1,
  },
  {
    title: "Title 2",
    id: 2,
  },
  {
    title: "Title 3",
    id: 3,
  },
  {
    title: "Title 4",
    id: 4,
  },
  {
    title: "Title 5",
    id: 5,
  },
  {
    title: "Title 6",
    id: 6,
  },
  {
    title: "Title 7",
    id: 7,
  },
];
