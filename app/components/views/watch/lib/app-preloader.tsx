"use client";

import { useDispatch } from "react-redux";

import { BroadcastsState, setBroadcasts } from "@/lib/features/broadcasts/broadcasts-slice";
import { loadFollowedChannels, loadFollowedStreams } from "@/lib/features/followed/followed-slice";
import { setAccessToken } from "@/lib/features/tokens/access-token-slice";
import { FollowedChannel, FollowedStream } from "@/types";

const AppPreloader = ({
  accessToken,
  refreshToken,
  screenBroadcasts,
  followedChannels,
  followedStreams,
}: {
  accessToken: string;
  refreshToken: string;
  screenBroadcasts: BroadcastsState["broadcasts"];
  followedChannels: Array<FollowedStream | FollowedChannel>;
  followedStreams: Array<FollowedStream>;
}) => {
  const dispatch = useDispatch();

  dispatch(setAccessToken({ accessToken, refreshToken }));
  dispatch(setBroadcasts(screenBroadcasts));
  dispatch(loadFollowedChannels(followedChannels));
  dispatch(loadFollowedStreams(followedStreams));

  return <></>;
};

export default AppPreloader;
