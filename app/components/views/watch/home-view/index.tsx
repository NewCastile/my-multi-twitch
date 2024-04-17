"use server";

import FollowedDrawer from "../lib/followed-drawer";
import SearchDrawer from "../lib/search-drawer";

import ChatTabs from "./lib/chat-tabs";
import StreamsGrid from "./lib/stream-grid";

const HomeView = async () => {
  return (
    <div className={"flex w-full flex-col items-center justify-center"}>
      <div className={"flex w-full flex-row items-start justify-center gap-6 px-6"}>
        <div className={"flex w-[80vw] flex-col items-center justify-center"}>
          <div className={"flex w-full flex-row items-center justify-start gap-6"}>
            <FollowedDrawer />
            <SearchDrawer />
          </div>
          <StreamsGrid />
        </div>
        <ChatTabs />
      </div>
    </div>
  );
};

export default HomeView;
