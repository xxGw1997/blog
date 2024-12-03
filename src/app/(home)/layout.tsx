import React, { PropsWithChildren } from "react";
import { Toolbar } from "~/components/toolbar";

const PostLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Toolbar />
      {children}
    </>
  );
};

export default PostLayout;
