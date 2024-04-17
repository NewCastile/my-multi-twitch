"use client";

import { useRouter } from "next/navigation";

import { AddIcon } from "@/app/components/icons/add-icon";
import useDrawerContext from "@/app/hooks/use-drawer-context";
import { useAppSelector } from "@/lib/store";

const AddBroadcastLink = ({
  broadcasterLogin,
  iconOnly = false,
}: {
  broadcasterLogin: string;
  iconOnly?: boolean;
}) => {
  const { broadcasts, maxReached } = useAppSelector((state) => state.broadcasts);
  const context = useDrawerContext();
  const router = useRouter();
  const channels = broadcasts.map((broadcast) => broadcast.broadcaster_login);
  const newChannels = channels.join("/").concat(`/${broadcasterLogin}`);
  const isNewChannel = channels.every((channel) => channel !== broadcasterLogin);

  const route = `/watch/${newChannels}`;

  if (maxReached || !isNewChannel) return null;

  return (
    <span
      className={"px-2 py-1 text-gray-400"}
      role={"link"}
      tabIndex={-1}
      onClick={() => {
        if (context) {
          const { drawer } = context;

          if (drawer) {
            drawer.hide();
          }
        }
        router.push(route);
      }}
    >
      {iconOnly ? (
        <AddIcon />
      ) : (
        <p>
          Add <AddIcon />
        </p>
      )}
    </span>
  );
};

export default AddBroadcastLink;
