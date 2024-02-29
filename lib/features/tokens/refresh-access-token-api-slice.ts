import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RefreshTokenData, RefreshTokenErrorResponse } from "@/types";
import { isRefreshTokenData } from "@/utils/type-guards";

interface SearchQueryArgs {
  refreshToken: string;
}

type SearchQueryResult = RefreshTokenData | RefreshTokenErrorResponse;

export const refreshAccessTokenApi = createApi({
  reducerPath: "refreshAccessTokenApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://id.twitch.tv/oauth2`,
  }),
  tagTypes: ["tokens", "oauthError", "error"],
  endpoints: (builder) => ({
    refreshAccessToken: builder.query<SearchQueryResult, SearchQueryArgs>({
      query: (args) => {
        const { refreshToken } = args;

        return {
          url: `/token`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET,
            grant_type: "refresh_token",
            refresh_token: refreshToken,
          }),
        };
      },

      providesTags: (result, error) => {
        if (!result || error) return [{ type: "error", error }];
        if (!isRefreshTokenData(result)) {
          return [{ type: "oauthError", result }];
        }

        return [{ type: "tokens", result }];
      },
    }),
  }),
});

export const { useRefreshAccessTokenQuery, useLazyRefreshAccessTokenQuery } = refreshAccessTokenApi;
