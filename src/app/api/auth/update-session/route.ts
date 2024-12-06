import { NextRequest } from "next/server";
import { updateSession } from "~/features/session/use-session";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { accessToken, refreshToken } = body;

  if (!accessToken || !refreshToken)
    return new Response("Please provide Tokens", { status: 401 });

  await updateSession({ accessToken, refreshToken });

  return new Response("OK", { status: 200 });
}
