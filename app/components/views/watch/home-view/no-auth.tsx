"use client";

import SearchDrawer from "../lib/search-drawer";

import ChatTabs from "./lib/chat-tabs";
import StreamsGrid from "./lib/stream-grid";

const UnauthorizedHomeView = () => {
  return (
    <div className={"flex w-full flex-col items-center justify-center"}>
      <div className={"flex w-full flex-row items-start justify-center space-x-6 px-6 py-4"}>
        <div className={"relative flex w-[80vw] flex-col items-center justify-center"}>
          <div className={"flex w-full flex-row items-center justify-start space-x-6"}>
            <SearchDrawer />
          </div>
          <StreamsGrid />
        </div>
        <ChatTabs />
      </div>
    </div>
  );
};

export default UnauthorizedHomeView;
