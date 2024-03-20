"use server";

import { redirect } from "next/navigation";

import OAuthWatchApp from "@/app/components/views/watch/app";
import UnauthorizedWatchApp from "@/app/components/views/watch/app/no-auth";
import { MAX_BROADCASTS_NUMBER } from "@/constants";
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
    return <UnauthorizedWatchApp {...{ channels, screenBroadcasts }} />;
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

  return <OAuthWatchApp {...{ channels, screenBroadcasts }} />;
};

export default WatchPage;
