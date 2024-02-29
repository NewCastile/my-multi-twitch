"use client";

import { InteractiveTwitchPlayer } from "./interactive-twitch-player";

const TwitchPlayer = ({
  broadcasterLogin,
  height,
  width,
}: {
  height?: string | number | null;
  width?: string | number;
  broadcasterLogin: string;
}) => {
  return <InteractiveTwitchPlayer {...{ height, width, broadcasterLogin }} />;
};

export default TwitchPlayer;
