import Link from "next/link";

import { CloseIcon } from "@/app/components/icons/close-icon";
import { DEFAULT_ICON_SIZE } from "@/constants";
import { useAppSelector } from "@/lib/store";
import { IconProps } from "@/types";

const RemoveBroadcastLink = ({
  broadcasterLogin,
  size = DEFAULT_ICON_SIZE,
}: { broadcasterLogin: string } & IconProps) => {
  const { broadcasts } = useAppSelector((state) => state.broadcasts);
  const channels = broadcasts.map((broadcast) => broadcast.broadcaster_login);
  const newChannels = channels.filter((channel) => channel !== broadcasterLogin).join("/");
  const linkHref = `/watch/${newChannels}`;

  return (
    <Link href={linkHref}>
      <CloseIcon size={size} />
    </Link>
  );
};

export default RemoveBroadcastLink;
