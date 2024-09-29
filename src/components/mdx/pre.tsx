"use client";

import { useState } from "react";
import { RxTriangleDown, RxTriangleRight } from "react-icons/rx";
import { CopyButton } from "../copy-button";

export const Pre = ({ raw, children, ...rest }: any) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const lang = rest["data-language"] || "bash";

  return (
    <pre className="group" {...rest}>
      <div className="flex justify-between pb-5">
        <div className="flex items-center">
          <div onClick={() => setIsCollapsed((prev) => !prev)} className="cursor-pointer">
            {isCollapsed ? (
              <RxTriangleDown size={24} />
            ) : (
              <RxTriangleRight size={24} />
            )}
          </div>
          <span className="pl-5">{lang}</span>
        </div>
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <CopyButton content={raw} />
        </div>
      </div>
      {isCollapsed ? (
        <div>{children}</div>
      ) : (
        <span className="pl-3">.....</span>
      )}
    </pre>
  );
};
