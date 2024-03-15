import { redirect } from "next/navigation";

import ErrorView from "@/app/components/views/error";
import UnauthorizedWatchApp from "@/app/components/views/watch/app/no-auth";
import HomeView from "@/app/components/views/watch/home-view";
import AppPreloader from "@/app/components/views/watch/lib/app-preloader";
import NoChannelsView from "@/app/components/views/watch/no-channels-view";
import {
  fetchAppAccessToken,
  fetchUserFollowedChannels,
  fetchUserFollowedStreams,
} from "@/app/fetchers";
import { ReduxProvider } from "@/app/providers";
import { MAX_BROADCASTS_NUMBER } from "@/constants";
import { FollowedChannel, FollowedEntity, FollowedStream } from "@/types";
import { createClient } from "@/utils/supabase/server";

const WatchPage = async ({ params }: { params: { channels?: string[] } }) => {
  const channels = params.channels ?? [];
  const hasRepeatedChannels = channels.some(
    (channel, channelIdx) => channels.indexOf(channel, channelIdx + 1) !== -1,
  );

  const maxReached = channels.length > MAX_BROADCASTS_NUMBER;

  const channelsArray = Array.from(new Set(channels.slice(0, MAX_BROADCASTS_NUMBER)));
  const formatedUrl = `/watch/${channelsArray.join("/")}`;

  if (hasRepeatedChannels || maxReached) {
    redirect(formatedUrl);
  }

  const screenBroadcasts = channelsArray.length
    ? channels.map((channel) => ({
        broadcaster_login: channel.toLowerCase(),
        broadcaster_name: channel,
      }))
    : [];

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!user || !session) {
    const fetchAppAccessTokenResponse = await fetchAppAccessToken();

    if ("message" in fetchAppAccessTokenResponse) {
      const { message, status } = fetchAppAccessTokenResponse;

      redirect(`/?message=${message}&status=${status}`);
    }
    const { access_token: accessToken } = fetchAppAccessTokenResponse;

    return <UnauthorizedWatchApp {...{ accessToken, channels, screenBroadcasts }} />;
  }

  const { data: profiles } = await supabase.from("profiles").select("*").eq("id", user.id);

  if (profiles) {
    const [profile] = profiles;

    if (profile) {
      await supabase
        .from("profiles")
        .update({ last_visited: channelsArray.length ? formatedUrl : null })
        .eq("id", user.id)
        .select();
    }
  }

  const {
    user_metadata: { provider_id: providerAccountId },
  } = user;

  const { provider_token: accessToken, provider_refresh_token: refreshToken } = session;

  if (!accessToken || !refreshToken) {
    redirect("/login");
  }

  const fetchFollowedChannelsResponse = await fetchUserFollowedChannels({
    providerAccountId,
    accessToken,
  });

  if ("message" in fetchFollowedChannelsResponse) {
    return <ErrorView {...fetchFollowedChannelsResponse} />;
  }

  const fetchFollowedStreamsResponse = await fetchUserFollowedStreams({
    providerAccountId,
    accessToken,
  });

  if ("message" in fetchFollowedStreamsResponse) {
    return <ErrorView {...fetchFollowedStreamsResponse} />;
  }

  const { data: followedStreamsData } = fetchFollowedStreamsResponse;

  const emptyArray: Array<FollowedStream | FollowedChannel> = [];

  const loginMappedFollowedStreams = followedStreamsData.map((stream) => stream.user_login);

  const loginFilteredFollowedChannels = fetchFollowedChannelsResponse.data.filter(
    (channel) => !loginMappedFollowedStreams.includes(channel.broadcaster_login),
  );

  const followedChannelsData: Array<FollowedEntity> = emptyArray
    .concat(followedStreamsData)
    .concat(loginFilteredFollowedChannels);

  return (
    <>
      <ReduxProvider>
        <AppPreloader
          {...{
            screenBroadcasts,
            accessToken,
            refreshToken,
            followedChannels: followedChannelsData,
            followedStreams: followedStreamsData,
          }}
        />
        {channels.length > 0 ? <HomeView /> : <NoChannelsView />}
      </ReduxProvider>
    </>
  );
};

export default WatchPage;
