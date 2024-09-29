"use client";

import React, { useState } from "react";
import { VariantProps } from "class-variance-authority";

import { Button, buttonVariants } from "./ui/button";
import { cn } from "~/lib/utils";
import { LuCopy, LuCopyCheck } from "react-icons/lu";

interface CopyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  content: string;
}

export const CopyButton = ({ className, size, content }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    if (!content) return;
    await navigator.clipboard.writeText(content);
    setIsCopied(true);

    // 3秒后按钮内容复原
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };
  return (
    <Button
      className={cn(buttonVariants({ size, className, variant: "ghost" }))}
      variant="ghost"
      onClick={copy}
    >
      {isCopied ? (
        <div>
          <LuCopyCheck color="#32cd1d" size={22} />
        </div>
      ) : (
        <div>
          <LuCopy size={22} />
        </div>
      )}
    </Button>
  );
};
