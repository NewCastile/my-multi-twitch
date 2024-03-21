"use client";
import { ChangeEvent, useMemo, useState } from "react";

import { CloseIcon } from "@/app/components/icons/close-icon";
import useSearchFollowed from "@/app/hooks/use-search-followed";
import useSelectBroadcasts from "@/app/hooks/use-select-broadcasts";
import { FOLLOWED_ITEMS_PER_PAGE } from "@/constants";
import { BroadcasterBasicInfo, FollowedEntity } from "@/types";
import { isFollowedChannel } from "@/utils/type-guards";

import SearchFilterButton from "../../search-drawer/search-drawer-content/lib/search-filter-button";
import CancelSelectController from "../../shared/cancel-select-controller";
import ConfirmSelectController, {
  ConfirmSelectControllerIcon,
} from "../../shared/confirm-select-controller";

import FollowedChannelItem from "./lib/followed-channel-item";
import FollowedDrawerInput from "./lib/followed-input";
import FollowedStreamItem from "./lib/followed-stream-item";

const FollowedDrawerContent = ({ isError }: { isError?: boolean }) => {
  const {
    newUrl,
    selectedBroadcasts,
    selectAction,
    isSelecting,
    getIsOnScreen,
    getIsSelected,
    selectControlsHandlers: { closeSelect, onSelectHandler },
  } = useSelectBroadcasts({ selectAction: "add" });

  const [query, setQuery] = useState<string>("");
  const [liveOnly, setLiveOnly] = useState<boolean>(false);

  const {
    followeds,
    filteredFolloweds,
    pageToken,
    shownFollowed,
    controlButtonsHandler: { nextPageButtonOnClickHandler, prevPageButtonOnClickHandler },
  } = useSearchFollowed({ query, liveOnly });

  const getFollowedBasicInfo = (followed: FollowedEntity) => {
    const { broadcaster_login, broadcaster_name }: BroadcasterBasicInfo = isFollowedChannel(
      followed,
    )
      ? followed
      : { broadcaster_login: followed.user_login, broadcaster_name: followed.user_name };

    return { broadcaster_login, broadcaster_name };
  };

  const allFollowedsShown = useMemo(() => {
    return pageToken > FOLLOWED_ITEMS_PER_PAGE;
  }, [pageToken]);

  const hasNoFollowedChannels = useMemo(() => {
    return filteredFolloweds.length === 0;
  }, [filteredFolloweds]);

  const hasNextPage = useMemo(() => {
    return shownFollowed.length < followeds.length;
  }, [followeds, shownFollowed]);

  const searchInputOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setQuery(event.currentTarget.value);
  };

  return (
    <div className={"flex size-full flex-col items-center justify-start px-4 pb-4 font-bold"}>
      <div className={"flex w-full flex-col items-center justify-center gap-4"}>
        <div className={"flex flex-row items-center justify-center gap-2"}>
          <SearchFilterButton isActive={!liveOnly} onClickHandler={() => setLiveOnly(false)}>
            All
          </SearchFilterButton>
          <SearchFilterButton isActive={liveOnly} onClickHandler={() => setLiveOnly(true)}>
            Live only
          </SearchFilterButton>
        </div>
        <p className={"w-full text-left text-xl font-black"}>Channels</p>
        <FollowedDrawerInput onChangeHandler={searchInputOnChangeHandler} />
      </div>
      <div className={"flex w-full flex-col items-center justify-center gap-4 py-4"}>
        <div className={"flex w-full flex-row items-center justify-end gap-2"}>
          {isSelecting && selectedBroadcasts.length > 0 && (
            <>
              <CancelSelectController onClick={closeSelect}>
                <CloseIcon size={"0.6rem"} />
              </CancelSelectController>
              <ConfirmSelectController route={newUrl}>
                <ConfirmSelectControllerIcon selectAction={selectAction} size={"0.6rem"} />
              </ConfirmSelectController>
            </>
          )}
        </div>
        {isError ? (
          <div className={"flex w-full flex-col items-center justify-center gap-4"}>
            <p className={"w-full text-center"}>
              Sorry could&apos;nt load your followed channels 😢
            </p>
            <p className={"w-full text-center"}>Try reloading the page.</p>
          </div>
        ) : hasNoFollowedChannels ? (
          <p>You don&apos;t follow any channel 😶</p>
        ) : (
          <ul
            className={
              "flex size-full flex-col items-center justify-center divide-y-2 divide-monokai-bg-contrast overflow-y-auto overflow-x-hidden"
            }
          >
            {filteredFolloweds.map((followed, followedIdx) => {
              const { broadcaster_login, broadcaster_name } = getFollowedBasicInfo(followed);
              const isSelected = getIsSelected({ broadcaster_login });
              const isOnScreen = getIsOnScreen({ broadcaster_login });
              const onClickHandler = () =>
                onSelectHandler({
                  broadcaster_login,
                  broadcaster_name,
                });

              return isFollowedChannel(followed) ? (
                <FollowedChannelItem
                  key={followedIdx}
                  {...{ followedChannel: followed, isSelected, isOnScreen, onClickHandler }}
                />
              ) : (
                <FollowedStreamItem
                  key={followedIdx}
                  {...{ followedStream: followed, isSelected, isOnScreen, onClickHandler }}
                />
              );
            })}
          </ul>
        )}
        {!hasNoFollowedChannels && (
          <div className={"flex w-full flex-row items-center justify-between"}>
            {hasNextPage && (
              <button
                aria-label={"expand-followeds"}
                className={"btn-sm bg-monokai-bg-secondary text-xs font-bold uppercase"}
                tabIndex={-1}
                onClick={nextPageButtonOnClickHandler}
              >
                Show more
              </button>
            )}
            {allFollowedsShown && (
              <button
                aria-label={"collapse-followeds"}
                className={"btn-sm bg-monokai-bg-secondary text-xs font-bold uppercase"}
                tabIndex={-1}
                onClick={prevPageButtonOnClickHandler}
              >
                Show less
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowedDrawerContent;
