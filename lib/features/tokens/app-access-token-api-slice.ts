import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ApiErrorResponse, AppAccessTokenResponse } from "@/types";

// Define a service using a base URL and expected endpoints
export const appAccessTokenApi = createApi({
  reducerPath: "appAccessTokenApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://id.twitch.tv/oauth2" }),
  endpoints: (builder) => ({
    getAppAccessToken: builder.query<ApiErrorResponse | AppAccessTokenResponse, { key: string }>({
      query: () => {
        return {
          url: "/token",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET,
            grant_type: "client_credentials",
          }),
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLazyGetAppAccessTokenQuery } = appAccessTokenApi;
