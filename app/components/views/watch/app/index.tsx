import { ReduxProvider } from "@/app/providers";
import { BroadcasterBasicInfo, FollowedEntity, FollowedStream } from "@/types";

import HomeView from "../home-view";
import AppPreloader from "../lib/app-preloader";
import NoChannelsView from "../no-channels-view";

const WatchApp = ({
  channels,
  accessToken,
  followedChannels,
  followedStreams,
  refreshToken,
  screenBroadcasts,
}: {
  channels: Array<string>;
  screenBroadcasts: Array<BroadcasterBasicInfo>;
  accessToken: string;
  refreshToken: string;
  followedChannels: Array<FollowedEntity>;
  followedStreams: Array<FollowedStream>;
}) => {
  return (
    <>
      <ReduxProvider>
        <AppPreloader
          {...{
            screenBroadcasts,
            accessToken,
            refreshToken,
            followedChannels,
            followedStreams,
          }}
        />
        {channels.length > 0 ? <HomeView /> : <NoChannelsView />}
      </ReduxProvider>
    </>
  );
};

export default WatchApp;
