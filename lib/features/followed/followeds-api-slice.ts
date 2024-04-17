import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { FollowedChannelsResponse, FollowedStreamsResponse } from "@/types";

interface QueryArgs {
  providerAccountId: string;
  accessToken: string;
}

// Define a service using a base URL and expected endpoints
export const followedsApi = createApi({
  reducerPath: "followedsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.twitch.tv/helix" }),
  endpoints: (builder) => ({
    getFollowedChannels: builder.query<FollowedChannelsResponse, QueryArgs>({
      query: ({ providerAccountId, accessToken }) => {
        return {
          url: `/channels/followed?user_id=${providerAccountId}&first=100`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Client-Id": `${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}`,
          },
        };
      },
    }),
    getFollowedStreams: builder.query<FollowedStreamsResponse, QueryArgs>({
      query: ({ providerAccountId, accessToken }) => {
        return {
          url: `/streams/followed?user_id=${providerAccountId}&first=100`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Client-Id": `${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}`,
          },
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLazyGetFollowedChannelsQuery, useLazyGetFollowedStreamsQuery } = followedsApi;
