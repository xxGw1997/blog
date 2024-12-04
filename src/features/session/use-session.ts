"use server";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_SECRET_KEY } from "~/lib/constants";

export type Session = {
  user: {
    id: string;
    name: string;
  };
  // accessToken: string;
  // refreshToken: string;
};

const encodeSessionKey = new TextEncoder().encode(SESSION_SECRET_KEY);

export async function createSession(payload: Session) {
  const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const session = await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodeSessionKey);

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiredAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  const cookie = cookies().get("session")?.value;
  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie, encodeSessionKey, {
      algorithms: ["HS256"],
    });
    return payload as Session;
  } catch (error) {
    console.error("Failed to vertify the session", error);
    redirect("/auth/signin");
  }
}

export async function deleteSession() {
  await cookies().delete("session");
}
