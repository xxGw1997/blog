import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "~/features/session/use-session";
import { authFetch } from "~/lib/auth-fetch";
import { BACKEND_URL } from "~/lib/constants";

export async function GET(req: NextRequest) {
  const response = await authFetch(`${BACKEND_URL}/aut/signout`, {
    method: "POST",
  });

  if (response.ok) {
    await deleteSession();
  }

  revalidatePath("/", "layout");
  revalidatePath("/", "page");

  return NextResponse.redirect(new URL("/", req.nextUrl));
}
