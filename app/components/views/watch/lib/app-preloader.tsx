"use client";

import { useDispatch } from "react-redux";

import { BroadcastsState, setBroadcasts } from "@/lib/features/broadcasts/broadcasts-slice";
import { loadFollowedChannels, loadFollowedStreams } from "@/lib/features/followed/followed-slice";
import { setAccessToken } from "@/lib/features/tokens/access-token-slice";
import { FollowedEntity, FollowedStream } from "@/types";

const AppPreloader = ({
  accessToken,
  refreshToken,
  screenBroadcasts,
  followedChannels,
  followedStreams,
}: {
  accessToken?: string;
  refreshToken?: string;
  screenBroadcasts?: BroadcastsState["broadcasts"];
  followedChannels?: Array<FollowedEntity>;
  followedStreams?: Array<FollowedStream>;
}) => {
  const dispatch = useDispatch();

  if (followedChannels) dispatch(loadFollowedChannels(followedChannels));
  if (followedStreams) dispatch(loadFollowedStreams(followedStreams));
  if (accessToken) dispatch(setAccessToken({ accessToken, refreshToken }));
  if (screenBroadcasts) dispatch(setBroadcasts(screenBroadcasts));

  return <></>;
};

export default AppPreloader;
