"use client";

const TwitchPlayer = ({
  broadcasterLogin,
  height,
  width,
}: {
  height?: string | number | null;
  width?: string | number;
  broadcasterLogin: string;
}) => {
  return (
    <iframe
      allowFullScreen
      height={height ?? 240}
      loading={"lazy"}
      src={`https://player.twitch.tv/?channel=${broadcasterLogin}&parent=${process.env.NEXT_PUBLIC_EMBEDDED_IFRAME_PARENT}&muted=false`}
      title={`${broadcasterLogin}-player`}
      width={width ?? "100%"}
    />
  );
};

export default TwitchPlayer;
