import { ReduxProvider } from "@/app/providers";
import { BroadcasterBasicInfo } from "@/types";

import HomeView from "../home-view";
import AppPreloader from "../lib/app-preloader";
import NoChannelsView from "../no-channels-view";

const OAuthWatchApp = ({
  channels,
  screenBroadcasts,
}: {
  channels: Array<string>;
  screenBroadcasts: Array<BroadcasterBasicInfo>;
}) => {
  return (
    <>
      <ReduxProvider>
        <AppPreloader
          {...{
            screenBroadcasts,
          }}
        />
        {channels.length > 0 ? <HomeView /> : <NoChannelsView />}
      </ReduxProvider>
    </>
  );
};

export default OAuthWatchApp;
