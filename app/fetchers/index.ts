import {
  ApiErrorResponse,
  FollowedChannelsResponse,
  FollowedStreamsResponse,
  RefreshTokenData,
} from "@/types";
import { isRefreshTokenData } from "@/utils/type-guards";

const fetchTwitchApiEndpoint = async <T>({
  url,
  accessToken,
}: {
  url: string;
  accessToken: string;
}): Promise<T | ApiErrorResponse> => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Client-Id": `${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}`,
    },
  });

  const responseData = await response.json();

  if (response.ok) {
    return responseData as T;
  } else {
    return {
      message: `${responseData.message}`,
      status: response.status,
      statusText: response.statusText,
    };
  }
};

export const fetchUserFollowedChannels = async ({
  providerAccountId,
  accessToken,
}: {
  providerAccountId: string;
  accessToken: string;
}): Promise<ApiErrorResponse | FollowedChannelsResponse> => {
  const twitchAPIRequestURL = `https://api.twitch.tv/helix/channels/followed?user_id=${providerAccountId}&first=100`;

  const response = await fetchTwitchApiEndpoint<FollowedChannelsResponse>({
    url: twitchAPIRequestURL,
    accessToken,
  });

  return response;
};

export const fetchUserFollowedStreams = async ({
  providerAccountId,
  accessToken,
}: {
  providerAccountId: string;
  accessToken: string;
}): Promise<ApiErrorResponse | FollowedStreamsResponse> => {
  const twitchAPIRequestURL = `https://api.twitch.tv/helix/streams/followed?user_id=${providerAccountId}&first=100`;

  const response = await fetchTwitchApiEndpoint<FollowedStreamsResponse>({
    url: twitchAPIRequestURL,
    accessToken,
  });

  return response;
};

// fetches the new access and refresh token
export const getRefreshToken = async (
  refreshToken: string,
): Promise<RefreshTokenData | ApiErrorResponse> => {
  const response = await fetch("https://id.twitch.tv/oauth2/token", {
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
  });

  const responseData = await response.json();

  if (isRefreshTokenData(responseData)) {
    return responseData;
  } else {
    return {
      message: `${responseData.message}`,
      status: response.status,
      statusText: response.statusText,
    };
  }
};
