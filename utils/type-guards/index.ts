import { ApiErrorResponse, FollowedChannel, FollowedEntity, SearchChannelResponse } from "@/types";

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
