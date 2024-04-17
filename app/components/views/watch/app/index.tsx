import { ReduxProvider } from "@/app/providers";
import { BroadcasterBasicInfo, Profile } from "@/types";

import HomeView from "../home-view";
import AppPreloader from "../lib/app-preloader";
import NoChannelsView from "../no-channels-view";

const OAuthWatchApp = ({
  channels,
  screenBroadcasts,
  profile,
  accessToken,
  refreshToken,
}: {
  channels: Array<string>;
  screenBroadcasts: Array<BroadcasterBasicInfo>;
  profile?: Profile;
  accessToken?: string;
  refreshToken?: string;
}) => {
  return (
    <>
      <ReduxProvider>
        <AppPreloader
          {...{
            screenBroadcasts,
            profile,
            accessToken,
            refreshToken,
          }}
        />
        {channels.length > 0 ? <HomeView /> : <NoChannelsView />}
      </ReduxProvider>
    </>
  );
};

export default OAuthWatchApp;
