"use server";

import { fetchUserFollowedChannels, fetchUserFollowedStreams } from "@/app/fetchers";
import { FollowedChannel, FollowedEntity, FollowedStream } from "@/types";
import { createClient } from "@/utils/supabase/server";

import AppPreloader from "../app-preloader";

import FollowedDrawerClientComponent from "./followed-drawer-cc";

const FollowedDrawer = async () => {
  const supabase = createClient();

  const userData = supabase.auth.getUser().then((res) => res.data.user);
  const accessTokenData = supabase.auth.getSession().then((res) => {
    const {
      data: { session },
    } = res;

    if (session) {
      const { provider_token: accessToken, provider_refresh_token: refreshToken } = session;

      if (accessToken && refreshToken) {
        return { accessToken, refreshToken };
      } else {
        return { accessToken: undefined, refreshToken: undefined };
      }
    } else {
      return { accessToken: undefined, refreshToken: undefined };
    }
  });

  const [user, { accessToken, refreshToken }] = await Promise.all([userData, accessTokenData]);

  if (!user || !accessToken || !refreshToken) {
    return <FollowedDrawerClientComponent {...{ isError: true }} />;
  }

  const {
    user_metadata: { provider_id: providerAccountId },
  } = user;

  const followedChannelResponse = fetchUserFollowedChannels({
    providerAccountId,
    accessToken,
  });

  const followedStreamsResponse = fetchUserFollowedStreams({
    providerAccountId,
    accessToken,
  });

  const [followedChannelsData, followedStreamsData] = await Promise.all([
    followedChannelResponse,
    followedStreamsResponse,
  ]);

  if ("message" in followedChannelsData || "message" in followedStreamsData) {
    return <FollowedDrawerClientComponent {...{ isError: true }} />;
  }

  const [{ data: followedChannels }, { data: followedStreams }] = [
    followedChannelsData,
    followedStreamsData,
  ];

  const emptyArray: Array<FollowedStream | FollowedChannel> = [];

  const loginMappedFollowedStreams = followedStreams.map((stream) => stream.user_login);

  const loginFilteredFollowedChannels = followedChannels.filter(
    (channel) => !loginMappedFollowedStreams.includes(channel.broadcaster_login),
  );

  const followeds: Array<FollowedEntity> = emptyArray
    .concat(followedStreams)
    .concat(loginFilteredFollowedChannels);

  return (
    <>
      <AppPreloader
        {...{
          followedChannels: followeds,
          followedStreams,
          accessToken,
          refreshToken,
        }}
      />
      <FollowedDrawerClientComponent {...{ isError: false }} />
    </>
  );
};

export default FollowedDrawer;
