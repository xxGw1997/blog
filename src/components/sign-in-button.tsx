import { LogOut, UserCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { getSession } from "~/features/session/use-session";
import { Hint } from "./hint";

const SignInButton = async () => {
  const session = await getSession();
  return (
    <>
      {!session || !session.user ? (
        <>
          <Link href={"/auth/signin"}>
            <Hint label="登录" side="right">
              <UserCircleIcon />
            </Hint>
          </Link>
        </>
      ) : (
        <>
          <span>{session.user.name}</span>
          <a
            href={"/api/auth/signout"}
            className="inline-block align-bottom pl-3"
          >
            <Hint label="退出登录" side="right">
              <LogOut />
            </Hint>
          </a>
        </>
      )}
    </>
  );
};

export default SignInButton;
