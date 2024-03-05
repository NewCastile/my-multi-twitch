import { ApiErrorResponse, FollowedChannelsResponse, FollowedStreamsResponse } from "@/types";

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
