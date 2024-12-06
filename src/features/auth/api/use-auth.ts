"use server";

import { redirect } from "next/navigation";
import { createSession } from "~/features/session/use-session";
import { BACKEND_URL } from "~/lib/constants";
import { FormState, LoginFormSchema, SignupFormSchema } from "~/lib/types";

export async function signUp(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validationFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${BACKEND_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validationFields.data),
  });
  if (response.ok) {
    redirect("/auth/signin");
  } else
    return {
      message:
        response.status === 409
          ? "The user is already existed!"
          : response.statusText,
    };
}

export async function signIn(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validationFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }
  const response = await fetch(`${BACKEND_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validationFields.data),
  });

  if (response.ok) {
    const result = await response.json();
    await createSession({
      user: {
        id: result.id,
        name: result.name,
      },
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
    redirect("/");
  } else {
    return {
      message:
        response.status === 401 ? "Invalid Credentials" : response.statusText,
    };
  }
}

export async function refreshToken(oldRefreshToken: string) {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: oldRefreshToken }),
    });

    if (!response.ok)
      throw new Error("Failed to refresh token" + response.statusText);

    const { accessToken, refreshToken } = await response.json();

    // update Session
    const updatedRes = await fetch("http://localhost:3000/api/auth/update-session", {
      method: "POST",
      body: JSON.stringify({ accessToken, refreshToken }),
    });

    if (!updatedRes.ok) throw new Error("Failed to update the tokens");

    return accessToken;
  } catch (error) {
    console.error("Refresh Token Failed", error);
    return null;
  }
}
