import { redirect } from "next/navigation";

import ErrorView from "@/app/components/views/error";
import SessionExpiredView from "@/app/components/views/error/lib/session-expired-view";
import HomeView from "@/app/components/views/watch/home-view";
import AppPreloader from "@/app/components/views/watch/lib/app-preloader";
import NoChannelsView from "@/app/components/views/watch/no-channels-view";
import { fetchUserFollowedChannels, fetchUserFollowedStreams } from "@/app/fetchers";
import { ReduxProvider } from "@/app/providers";
import { MAX_BROADCASTS_NUMBER } from "@/constants";
import { FollowedChannel, FollowedStream } from "@/types";
import { createClient } from "@/utils/supabase/server";

const WatchPage = async ({ params }: { params: { channels?: string[] } }) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!user) {
    redirect("/login");
  }

  if (!session) {
    return <SessionExpiredView />;
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

  const emptyArray: Array<FollowedStream | FollowedChannel> = [];

  const loginMappedFollowedStreams = fetchFollowedStreamsResponse.data.map(
    (stream) => stream.user_login,
  );

  const loginFilteredFollowedChannels = fetchFollowedChannelsResponse.data.filter(
    (channel) => !loginMappedFollowedStreams.includes(channel.broadcaster_login),
  );

  const followedChannelsData: Array<FollowedStream | FollowedChannel> = emptyArray
    .concat(fetchFollowedStreamsResponse.data)
    .concat(loginFilteredFollowedChannels);

  const channels = params.channels ?? [];
  const hasRepeatedChannels = channels.some(
    (channel, channelIdx) => channels.indexOf(channel, channelIdx + 1) !== -1,
  );

  const maxReached = channels.length > MAX_BROADCASTS_NUMBER;

  const channelsArray = Array.from(new Set(channels.slice(0, MAX_BROADCASTS_NUMBER)));

  if (hasRepeatedChannels || maxReached) {
    const newUrl = `/watch/${channelsArray.join("/")}`;

    redirect(newUrl);
  }

  const screenBroadcasts = channelsArray.length
    ? channels.map((channel) => ({
        broadcaster_login: channel.toLowerCase(),
        broadcaster_name: channel,
      }))
    : [];

  return (
    <>
      <ReduxProvider>
        <AppPreloader
          {...{
            screenBroadcasts,
            accessToken,
            refreshToken,
            followedChannels: followedChannelsData,
            followedStreams: fetchFollowedStreamsResponse.data,
          }}
        />
        {channels.length > 0 ? <HomeView /> : <NoChannelsView />}
      </ReduxProvider>
    </>
  );
};

export default WatchPage;
