import { ReduxProvider } from "@/app/providers";
import { BroadcasterBasicInfo } from "@/types";

import UnauthorizedHomeView from "../home-view/no-auth";
import AppPreloader from "../lib/app-preloader";
import UnauthorizedNoChannelsView from "../no-channels-view/no-auth";

const UnauthorizedWatchApp = ({
  channels,
  accessToken,
  screenBroadcasts,
}: {
  channels: Array<string>;
  screenBroadcasts: Array<BroadcasterBasicInfo>;
  accessToken: string;
}) => {
  return (
    <>
      <ReduxProvider>
        <AppPreloader
          {...{
            screenBroadcasts,
            accessToken,
          }}
        />
        {channels.length > 0 ? <UnauthorizedHomeView /> : <UnauthorizedNoChannelsView />}
      </ReduxProvider>
    </>
  );
};

export default UnauthorizedWatchApp;
