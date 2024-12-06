import { refreshToken } from "~/features/auth/api/use-auth";
import { getSession } from "~/features/session/use-session";

export interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const authFetch = async (
  url: string | URL,
  options: FetchOptions = {}
) => {
  const session = await getSession();

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${session?.accessToken}`,
  };

  let response = await fetch(url, options);
  console.log('---:',response)

  if (response.status === 401) {
    if (!session?.refreshToken) throw new Error("RefreshToken not found!");

    const newAccessToken = await refreshToken(session.refreshToken);

    if (newAccessToken) {
      options.headers.Authorization = `Bearer ${newAccessToken}`;
      response = await fetch(url, options);
    }
  }

  return response;
};
