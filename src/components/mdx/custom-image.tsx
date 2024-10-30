import React from "react";

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
  return <img alt={alt} src={src} width={width} height={height} {...rest} />;
};
