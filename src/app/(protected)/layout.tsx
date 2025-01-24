import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";
import { Toolbar } from "~/components/header/toolbar";
import { getSession } from "~/features/session/use-session";

const PostLayout = async ({ children }: PropsWithChildren) => {
  const session = await getSession();
  if (!session || !session.user) redirect("/auth/signin");

  return (
    <>
      <Toolbar />
      {children}
    </>
  );
};

export default PostLayout;
