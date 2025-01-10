"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

interface CustomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  [key: string]: any;
}

export const CustomImage = ({
  src,
  alt,
  width,
  height,
  ...rest
}: CustomImageProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <img alt={alt} src={src} width={width} height={height} {...rest}  className="cursor-zoom-in"/>;
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()} className="max-w-[90%] max-h-[80vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <img src={src} alt={alt} className="w-full" />
      </DialogContent>
    </Dialog>
  );
};
