import React from "react";
import { authFetch } from "~/lib/auth-fetch";
import { BACKEND_URL } from "~/lib/constants";

const ProtectedPage = async () => {
  const res = await authFetch(`${BACKEND_URL}/auth/getUser`, {
    method: "POST",
  });
  return <div>ProtectedPage</div>;
};

export default ProtectedPage;
