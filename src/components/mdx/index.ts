import { MDXRemoteProps } from "next-mdx-remote/rsc";

import Video from "./video";
import {
  BlockH2Tag,
  BlockH3Tag,
  BlockH4Tag,
  BlockH5Tag,
  BlockH6Tag,
} from "./block-h-tag";
import { Pre } from "./pre";
import { CustomImage } from "./custom-image";

export const customMDXComponents: MDXRemoteProps["components"] = {
  Video,
  h2: BlockH2Tag,
  h3: BlockH3Tag,
  h4: BlockH4Tag,
  h5: BlockH5Tag,
  h6: BlockH6Tag,
  pre: Pre,
  img: CustomImage,
};
