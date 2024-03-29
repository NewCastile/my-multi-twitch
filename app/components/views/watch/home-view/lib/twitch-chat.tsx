"use client";

const TwitchChat = ({
  broadcasterLogin,
  height,
  width,
}: {
  broadcasterLogin: string;
  height?: string | number;
  width?: string | number;
}) => {
  return (
    <iframe
      height={height ?? 500}
      id={`${broadcasterLogin}-chat-iframe`}
      loading={"lazy"}
      src={`https://www.twitch.tv/embed/${broadcasterLogin}/chat?parent=${process.env.NEXT_PUBLIC_EMBEDDED_IFRAME_PARENT}`}
      title={`${broadcasterLogin}-chat-iframe`}
      width={width ?? "100%"}
    />
  );
};

export default TwitchChat;
