"use client";
import { RefreshCcw } from "lucide-react";
import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "~/lib/utils";

interface MotionPlaygroundContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const MotionPlaygroundContainer = React.forwardRef<
  HTMLDivElement,
  MotionPlaygroundContainerProps
>(({ children, className, ...rest }, ref) => {
  const [componentKey, setComponentKey] = useState(0);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ rotate: "360deg", y: 2 }}
        whileTap={{ y: 5 }}
        className="absolute -left-12"
        onClick={() => setComponentKey((prev) => prev + 1)}
      >
        <RefreshCcw />
      </motion.button>
      <div
        ref={ref}
        key={componentKey}
        className={cn(
          "custom-scrollbar w-[500px] h-[500px] shadow-container rounded-md",
          className
        )}
        {...rest}
      >
        {children}
      </div>
    </div>
  );
});

MotionPlaygroundContainer.displayName = "MotionPlaygroundContainer";

export default MotionPlaygroundContainer;
