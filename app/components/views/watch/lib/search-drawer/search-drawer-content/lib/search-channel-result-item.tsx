"use client";

import NextImage from "next/image";

import { SearchChannel } from "@/types";

import AddBroadcastButton from "../../../shared/add-broadcast-button";

const SearchChannelResultItem = ({ matchingChannel }: { matchingChannel: SearchChannel }) => {
  const { broadcaster_login, display_name, is_live, game_name, title, thumbnail_url } =
    matchingChannel;

  return (
    <li
      className={
        "flex w-full flex-row items-center justify-center space-x-4 px-3 py-6 text-xs font-medium uppercase"
      }
    >
      <NextImage
        alt={"profile-picture"}
        className={"rounded-md"}
        height={50}
        src={thumbnail_url}
        width={50}
      />
      <div className={"flex w-full flex-col items-start justify-start space-y-2"}>
        {is_live ? (
          <p className={"w-[20ch] break-words text-justify text-sm font-black text-inherit"}>
            {display_name}
          </p>
        ) : (
          <p
            className={
              "w-[20ch] break-words text-justify text-sm font-black text-monokai-bg-contrast"
            }
          >
            {display_name}
          </p>
        )}
        {is_live && <p className={"w-full text-monokai-green-primary"}>{title}</p>}
        {is_live ? (
          <p className={"w-full text-left text-monokai-yellow"}>
            <span className={"mr-2 inline-block size-2.5 rounded-full bg-monokai-red-light"} />
            {game_name}
          </p>
        ) : (
          <p className={"w-full text-left text-monokai-bg-contrast"}>
            <span className={"mr-2 inline-block size-2.5 rounded-full bg-monokai-bg-contrast"} />
            Offline
          </p>
        )}
      </div>
      <AddBroadcastButton {...{ broadcasterLogin: broadcaster_login, iconOnly: true }} />
    </li>
  );
};

export default SearchChannelResultItem;
