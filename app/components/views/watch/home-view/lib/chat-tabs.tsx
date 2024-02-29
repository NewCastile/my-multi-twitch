"use client";

import { useContext } from "react";

import useTabs from "@/app/hooks/use-tabs";
import { SoundContext } from "@/lib/context";
import { useAppSelector } from "@/lib/store";
import { BroadcasterBasicInfo } from "@/types";

import RemoveBroadcastLink from "../../lib/shared/remove-broadcast-link";

import TwitchChat from "./twitch-chat";

const ChatTabs = () => {
  const broadcasters = useAppSelector((state) => state.broadcasts.broadcasts);
  const { tabs, tabsElementRef, tabPanelsParentRef } = useTabs({
    broadcasters,
    tabsElementId: "chat-tabs",
  });

  return (
    <>
      {broadcasters.length && (
        <div className={"sticky top-3 flex w-[30vw] flex-col"}>
          <div
            className={
              "flex h-full w-full flex-col items-center justify-center space-y-4 font-mono font-bold"
            }
          >
            <ul
              ref={tabsElementRef}
              className={"w-full grid grid-cols-3 pb-2 gap-2 border-b border-monokai-green-primary"}
              id={"chat-tabs"}
              role={"tablist"}
            >
              {broadcasters.map((broadcaster, broadcasterIdx) => {
                return (
                  <li
                    key={broadcasterIdx}
                    className={"flex w-full flex-col items-center justify-center"}
                    role={"presentation"}
                  >
                    <BroadcasterChatTab {...{ ...broadcaster, showTab: tabs?.show }} />
                  </li>
                );
              })}
            </ul>
            <div
              ref={tabPanelsParentRef}
              className={
                "flex flex-col w-full items-center justify-center overflow-x-auto overflow-y-hidden"
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

const BroadcasterChatTab = ({
  broadcaster_name,
  broadcaster_login,
}: BroadcasterBasicInfo & { showTab?: (tabId: string) => void }) => {
  const { references } = useContext(SoundContext);

  const muteEvent = new Event("mute");
  const playerRef = references.find((ref) => {
    if (ref.ref && ref.ref.current) {
      return ref.ref.current.id === `${broadcaster_login}-player`;
    } else {
      return false;
    }
  });

  return (
    <div className={"flex flex-row items-center justify-center space-x-1"}>
      {playerRef && playerRef.ref.current && (
        <button
          onClick={() => {
            if (playerRef.ref.current) {
              playerRef.ref.current.dispatchEvent(muteEvent);
            }
          }}
        >
          {playerRef.isMuted ? "🔇" : "🔊"}
        </button>
      )}
      <button
        aria-controls={`${broadcaster_login}-chat`}
        aria-selected={"false"}
        className={"w-full text-xs"}
        data-tabs-target={`#${broadcaster_login}-chat`}
        id={`${broadcaster_login}-tab`}
        role={"tab"}
        type={"button"}
      >
        <p className={"w-full cursor-pointer break-words uppercase"}>
          {broadcaster_name ?? broadcaster_login}{" "}
          <span className={"inline-block"}>
            <RemoveBroadcastLink broadcasterLogin={broadcaster_login} size={"0.6rem"} />
          </span>
        </p>
      </button>
    </div>
  );
};

export default ChatTabs;
