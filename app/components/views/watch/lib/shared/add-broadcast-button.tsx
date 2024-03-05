"use client";

import { useRouter } from "next/navigation";

import { AddIcon } from "@/app/components/icons/add-icon";
import useDrawerContext from "@/app/hooks/use-drawer-context.tsx";
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
    <div className={"px-2 py-1"}>
      <button
        className={"text-gray-400"}
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
      </button>
    </div>
  );
};

export default AddBroadcastLink;
