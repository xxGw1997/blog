"use client";

import React from "react";
import { useAnimate } from "motion/react";
import MotionPlaygroundContainer from "../container";

export const UseAnimation = () => {
  return (
    <MotionPlaygroundContainer>
      <Example />
    </MotionPlaygroundContainer>
  );
};

const Example = () => {
  const [scope, animate] = useAnimate();

  const handleAnimate = async () => {
    await animate("button", { x: 10, y: -10, rotate: "180deg" });
    await animate("#use-animation-targer", { x: 150 });
    await animate(
      "#use-animation-targer",
      { y: 150, rotate: "360deg" },
      { duration: 0.5 }
    );
    await animate("#use-animation-targer", { borderRadius: "100%" });
    await animate("#use-animation-targer", {
      x: -150,
      borderRadius: "25px",
      rotate: "180deg",
      background: "#ff9798",
    });

    await animate("button", { x: 0, y: 0, rotate: "360deg" });
    await animate("#use-animation-targer", { y: 0 });
    await animate(
      "#use-animation-targer",
      {
        x: 0,
        borderRadius: "0px",
        rotate: "0deg",
        background: "#fdba74",
      },
      {
        duration: 1.5,
      }
    );
  };

  return (
    <div ref={scope} className="grid place-content-center">
      <div id="use-animation-targer" className="w-32 h-32 bg-orange-300"></div>
      <button
        onClick={handleAnimate}
        className="bg-indigo-400 text-white rounded-md mt-6 p-2 font-medium"
      >
        trigger animate
      </button>
    </div>
  );
};
