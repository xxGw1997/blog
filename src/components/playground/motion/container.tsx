import React from "react";
import { cn } from "~/lib/utils";

interface MotionPlaygroundContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const MotionPlaygroundContainer = React.forwardRef<
  HTMLDivElement,
  MotionPlaygroundContainerProps
>(({ children, className, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "custom-scrollbar w-[500px] h-[500px] shadow-container",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

MotionPlaygroundContainer.displayName = "MotionPlaygroundContainer";

export default MotionPlaygroundContainer;
