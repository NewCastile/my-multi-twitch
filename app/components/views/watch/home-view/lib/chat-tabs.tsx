"use client";

import useTabs from "@/app/hooks/use-tabs";
import { useAppSelector } from "@/lib/store";
import { BroadcasterBasicInfo } from "@/types";

import TwitchChat from "./twitch-chat";

const ChatTabs = () => {
  const broadcasters = useAppSelector((state) => state.broadcasts.broadcasts);
  const { tabsElementRef, tabPanelsParentRef } = useTabs({
    broadcasters,
    tabsElementId: "chat-tabs",
  });

  return (
    <>
      {broadcasters.length && (
        <div className={"sticky top-3 flex w-[30vw] flex-col"}>
          <div
            className={
              "flex h-auto w-full flex-col items-center justify-center gap-4 font-mono font-bold"
            }
          >
            <ul
              ref={tabsElementRef}
              className={
                "flex w-full flex-row flex-wrap gap-4 border-b-2 border-monokai-violet-primary pb-2"
              }
              id={"chat-tabs"}
              role={"tablist"}
            >
              {broadcasters.map((broadcaster, broadcasterIdx) => {
                return (
                  <li
                    key={broadcasterIdx}
                    className={"inline-flex w-max flex-row items-center justify-center gap-1"}
                    role={"presentation"}
                  >
                    <BroadcasterChatButton {...{ ...broadcaster }} />
                  </li>
                );
              })}
            </ul>
            <div
              ref={tabPanelsParentRef}
              className={
                "flex w-full flex-row items-center justify-center overflow-x-auto overflow-y-hidden"
              }
              id={"tabs-content"}
            >
              {broadcasters.map((broadcaster, broadcasterIdx) => {
                return (
                  <div
                    key={broadcasterIdx}
                    aria-labelledby={`${broadcaster.broadcaster_login}-tab`}
                    className={"flex w-full flex-col items-center justify-center"}
                    id={`${broadcaster.broadcaster_login}-chat`}
                    role={"tabpanel"}
                  >
                    <TwitchChat broadcasterLogin={broadcaster.broadcaster_login} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const BroadcasterChatButton = ({ broadcaster_name, broadcaster_login }: BroadcasterBasicInfo) => {
  return (
    <button
      aria-controls={`${broadcaster_login}-chat`}
      aria-label={"tab-button"}
      className={"w-full text-xs uppercase text-monokai-yellow"}
      data-tabs-target={`#${broadcaster_login}-chat`}
      id={`${broadcaster_login}-tab`}
      role={"tab"}
      type={"button"}
    >
      {broadcaster_name ?? broadcaster_login}
    </button>
  );
};

export default ChatTabs;
