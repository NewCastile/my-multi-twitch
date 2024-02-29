"use client";

import Script from "next/script";
import { useContext, useRef } from "react";

import { SoundContext } from "@/lib/context";

export const InteractiveTwitchPlayer = ({
  broadcasterLogin,
}: {
  height?: string | number | null;
  width?: string | number;
  broadcasterLogin: string;
}) => {
  const playerRef = useRef<HTMLDivElement>(null);

  const { setReferences } = useContext(SoundContext);

  const toggleAudio = (isMuted: boolean) => {
    setReferences((prev) => {
      const toggledRefIndex = prev.findIndex((ref) => {
        if (ref.ref && ref.ref.current) {
          return ref.ref.current.id === `${broadcasterLogin}-player`;
        } else {
          return false;
        }
      });
      const toggledRef = prev[toggledRefIndex];

      return prev.toSpliced(toggledRefIndex, 1, { ...toggledRef, isMuted });
    });
  };

  return (
    <>
      <div ref={playerRef} className={"w-full h-60"} id={`${broadcasterLogin}-player`} />
      <Script
        id={`${broadcasterLogin}-interactive-frame`}
        src={"https://player.twitch.tv/js/embed/v1.js"}
        onError={() => {
          console.log("error!");
        }}
        onLoad={() => {
          const options = {
            width: "100%",
            height: "240px",
            channel: broadcasterLogin,
            // only needed if your site is also embedded on embed.example.com and othersite.example.com
            parent: [process.env.NEXT_PUBLIC_EMBEDDED_IFRAME_PARENT],
            muted: true,
          };

          const player = new Twitch.Player(`${broadcasterLogin}-player`, options);

          if (playerRef.current) {
            const muted = player.getMuted() ? player.getMuted() : true;

            setReferences((prev) => prev.concat({ ref: playerRef, isMuted: muted }));

            playerRef.current.addEventListener("mute", () => {
              const muted = player.getMuted() ?? true;

              toggleAudio(!muted);
              player.setMuted(!muted);
            });
          }
        }}
      />
    </>
  );
};
