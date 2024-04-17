"use client";

import { useFetchFolloweds } from "@/app/hooks/use-fetch-followeds";
import useSelectBroadcasts from "@/app/hooks/use-select-broadcasts";
import { useAppSelector } from "@/lib/store";
import { BroadcasterBasicInfo, FollowedEntity } from "@/types";
import { isFollowedChannel } from "@/utils/type-guards";

import FollowedChannelItem from "./lib/followed-channel-item";
import { FollowedDrawerContentSkeleton } from "./lib/followed-drawer-content-skeleton";
import FollowedStreamItem from "./lib/followed-stream-item";

const Followeds = ({ followeds }: { followeds: FollowedEntity[] }) => {
  const {
    selectState: { isOnScreen, isSelected },
    selectHandlers: { onSelectHandler },
  } = useSelectBroadcasts({ selectAction: "add" });

  const { followedChannelsState, followedStreamsState } = useFetchFolloweds();

  const { followedChannelsLoading, followedChannelsQueryError } = followedChannelsState;

  const { followedStreamsLoading, followedStreamsQueryError } = followedStreamsState;

  const { followedChannels } = useAppSelector((state) => state.followed);

  if (followedChannelsQueryError || followedStreamsQueryError) {
    return (
      <div className={"flex w-full flex-col items-center justify-center gap-4"}>
        <p className={"w-full text-center"}>Sorry could&apos;nt load your followed channels 😢</p>
        <p className={"w-full text-center"}>Try reloading the page.</p>
      </div>
    );
  }

  if (followedChannelsLoading || followedStreamsLoading) {
    return <FollowedDrawerContentSkeleton />;
  }

  if (followedChannels.length === 0) {
    return <p>You don&apos;t follow any channel 😶</p>;
  }

  return (
    <div className={"flex size-full flex-col items-center justify-start px-4 pb-4 font-bold"}>
      <ul
        className={
          "flex size-full flex-col items-center justify-center divide-y-2 divide-monokai-bg-contrast overflow-y-auto overflow-x-hidden"
        }
      >
        {followeds.map((followed, followedIdx) => {
          const { broadcaster_login, broadcaster_name } = getFollowedBasicInfo(followed);

          const onClickHandler = () =>
            onSelectHandler({
              broadcaster_login,
              broadcaster_name,
            });

          return isFollowedChannel(followed) ? (
            <FollowedChannelItem
              key={followedIdx}
              {...{
                followedChannel: followed,
                isSelected: isSelected({ broadcaster_login }),
                isOnScreen: isOnScreen({ broadcaster_login }),
                onClickHandler,
              }}
            />
          ) : (
            <FollowedStreamItem
              key={followedIdx}
              {...{
                followedStream: followed,
                isSelected: isSelected({ broadcaster_login }),
                isOnScreen: isOnScreen({ broadcaster_login }),
                onClickHandler,
              }}
            />
          );
        })}
      </ul>
    </div>
  );
};

const getFollowedBasicInfo = (followed: FollowedEntity) => {
  const { broadcaster_login, broadcaster_name }: BroadcasterBasicInfo = isFollowedChannel(followed)
    ? followed
    : { broadcaster_login: followed.user_login, broadcaster_name: followed.user_name };

  return { broadcaster_login, broadcaster_name };
};

export default Followeds;
