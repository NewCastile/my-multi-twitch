"use client";

import FollowedDrawer from "../lib/followed-drawer";
import SearchDrawer from "../lib/search-drawer";

const NoChannelsView = () => {
  return (
    <div className={"mt-10 w-full"}>
      <h1 className={"w-full text-center text-3xl font-extrabold text-monokai-bg-contrast"}>
        Look up for some twitch channels c:
      </h1>
      <div className={"flex flex-row items-center justify-center space-x-2"}>
        <SearchDrawer />
        <FollowedDrawer />
      </div>
    </div>
  );
};

export default NoChannelsView;
