"use server";

import SearchDrawer from "../lib/search-drawer";

import ChatTabs from "./lib/chat-tabs";
import StreamsGrid from "./lib/stream-grid";

const UnauthorizedHomeView = async () => {
  return (
    <div className={"flex w-full flex-col items-center justify-center"}>
      <div className={"flex w-full flex-row items-start justify-center gap-6 px-6"}>
        <div className={"relative flex w-[80vw] flex-col items-start justify-center"}>
          <SearchDrawer />
          <StreamsGrid />
        </div>
        <ChatTabs />
      </div>
    </div>
  );
};

export default UnauthorizedHomeView;
