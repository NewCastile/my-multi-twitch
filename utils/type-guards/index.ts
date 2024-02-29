import {
  ApiErrorResponse,
  FollowedChannel,
  FollowedEntity,
  RefreshTokenData,
  RefreshTokenErrorResponse,
  SearchChannelResponse,
} from "@/types";

export const isFollowedChannel = (
  object: undefined | FollowedEntity,
): object is FollowedChannel => {
  return typeof object === "object" && "broadcaster_login" in object;
};

export const isSearchChannelsResponse = (
  object: ApiErrorResponse | SearchChannelResponse,
): object is SearchChannelResponse => {
  return "pagination" in object && Array.isArray(object["data"]);
};

export const isRefreshTokenData = (
  object: RefreshTokenErrorResponse | RefreshTokenData,
): object is RefreshTokenData => {
  return typeof object === "object" && "refresh_token" in object && "scope" in object;
};
