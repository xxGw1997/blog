import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { createSession } from "~/features/session/use-session";
import { Role } from "~/lib/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const userId = searchParams.get("userId");
  const name = searchParams.get("name");

  if (!accessToken || !refreshToken || !userId || !name)
    throw new Error("Github Oauth Failed!");

  await createSession({
    user: {
      id: userId,
      name,
      role: Role.USER
    },
    accessToken,
    refreshToken,
  });

  redirect("/");
}
