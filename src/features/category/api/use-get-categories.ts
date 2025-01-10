"use server";

import { BACKEND_URL } from "~/lib/constants";

export const getCategories = async () => {
  const res = await fetch(`${BACKEND_URL}/category`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    return await res.json();
  } else {
    throw new Error("Get Categories Failed~");
  }
};
