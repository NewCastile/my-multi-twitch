"use client";

import ChatTabs from "./lib/chat-tabs";
import StreamsGrid from "./lib/stream-grid";

const HomeView = () => {
  return (
    <div className={"w-full flex flex-col justify-center items-center"}>
      <div className={"flex w-full flex-row items-start justify-center px-6 py-4"}>
        <StreamsGrid />
        <ChatTabs />
      </div>
    </div>
  );
};

export default HomeView;
