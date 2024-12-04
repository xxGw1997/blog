import { getSession } from "~/features/session/use-session";
import Link from "next/link";
import React from "react";

const SignInButton = async () => {
  const session = await getSession();
  return (
    <>
      {!session || !session.user ? (
        <>
          <Link href={"/auth/signin"}>Sign In</Link>
          <Link href={"/auth/signup"}>Sign Up</Link>
        </>
      ) : (
        <>
          <p>{session.user.name}</p>
          <a href={"/api/auth/signout"}>Sign Out</a>
        </>
      )}
    </>
  );
};

export default SignInButton;
