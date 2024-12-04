import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "~/features/session/use-session";

export async function GET(req: NextRequest) {
  await deleteSession();

  return NextResponse.redirect(new URL("/", req.nextUrl));
}
