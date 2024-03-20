"use client";
import { useEffect, useRef, useState } from "react";

import { CloseIcon } from "@/app/components/icons/close-icon";
import ExitFullScreenIcon from "@/app/components/icons/exit-fullscreen-icon";
import FullScreenIcon from "@/app/components/icons/fullscreen-icon";
import useSelectBroadcasts from "@/app/hooks/use-select-broadcasts";
import {
  BroadcasterBasicInfo,
  BroadcasterStreamCardProps,
  SelectAction,
  StreamsGridItem,
} from "@/types";

import CancelSelectController from "../../lib/shared/cancel-select-controller";
import ConfirmSelectController, {
  ConfirmSelectControllerIcon,
} from "../../lib/shared/confirm-select-controller";
import RemoveBroadcastLink from "../../lib/shared/remove-broadcast-link";
import SelectBroadcastButton from "../../lib/shared/select-broadcast-button";

import TwitchPlayer from "./twitch-player";

const orderByMaximized = (list: Array<StreamsGridItem>) => {
  const maximizedItems = list.filter((i) => i.isMaximized);
  const nonMaximizedItems = list.filter((i) => !i.isMaximized);
  const maximizedOrderedItems = maximizedItems.concat(nonMaximizedItems);

  return maximizedOrderedItems;
};

const updateGridItem = (list: Array<StreamsGridItem>, index: number) => {
  const selectedItem = list[index];
  const updatedItem: StreamsGridItem = { ...selectedItem, isMaximized: !selectedItem.isMaximized };
  const updatedList = list.slice(0, index).concat(updatedItem, list.slice(index + 1));

  return updatedList;
};

const StreamsGrid = () => {
  const {
    broadcasts,
    selectedBroadcasts,
    newUrl,
    selectAction,
    isSelecting,
    getIsSelected,

    selectControlsHandlers: { onSelectHandler, closeSelect },
  } = useSelectBroadcasts({
    selectAction: "filter",
  });

  const gridRef = useRef<HTMLDivElement>(null);

  const [listItems, setListItems] = useState<Array<StreamsGridItem>>(() =>
    broadcasts.map((b) => ({ ...b, isMaximized: false })),
  );

  useEffect(() => {
    setListItems(() => broadcasts.map((b) => ({ ...b, isMaximized: false })));
  }, [broadcasts]);

  const onFullScreen = (index: number) => {
    const newlistItems = updateGridItem(listItems, index);
    const orderedNewList = orderByMaximized(newlistItems);

    setListItems(orderedNewList);
  };

  const onSelect = ({ broadcaster }: { broadcaster: BroadcasterBasicInfo }) => {
    const { broadcaster_login, broadcaster_name } = broadcaster;

    onSelectHandler({
      broadcaster_login,
      broadcaster_name,
    });
  };

  return (
    <>
      {selectedBroadcasts.length > 0 && (
        <StreamsFilter {...{ closeSelect, isSelecting, newUrl, selectAction }} />
      )}
      {broadcasts && (
        <div ref={gridRef} className={"flex h-max w-full flex-col items-start justify-center py-4"}>
          <div className={"grid w-full grid-cols-2 gap-4"}>
            {listItems.map((broadcaster, broadcasterIdx) => {
              const { broadcaster_login } = broadcaster;
              const isSelected = getIsSelected({
                broadcaster_login,
              });

              return (
                <BroadcasterStreamCard
                  key={broadcasterIdx}
                  {...{ broadcaster, isSelected, index: broadcasterIdx, onSelect, onFullScreen }}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

const BroadcasterStreamCard = ({
  broadcaster,
  isSelected,
  index,
  onSelect,
  onFullScreen,
}: BroadcasterStreamCardProps) => {
  const { broadcaster_login, broadcaster_name, isMaximized } = broadcaster;

  return (
    <div
      className={`flex flex-col items-center justify-center ${
        isMaximized ? "col-span-2" : "col-span-1"
      }`}
    >
      <div
        className={
          "flex w-full flex-col items-center justify-center gap-3 bg-monokai-bg-secondary p-3"
        }
      >
        <div className={"flex w-full flex-row items-center justify-between px-2"}>
          <div className={"flex flex-row items-center justify-center gap-2"}>
            <SelectBroadcastButton
              {...{
                isSelected,
                onClickHandler: () => onSelect({ broadcaster }),
              }}
            />
            <p
              className={
                "w-max max-w-[19ch] border-b-4 border-b-monokai-violet-primary text-sm font-bold uppercase"
              }
            >
              {broadcaster_name ?? broadcaster_login}
            </p>
          </div>
          <div
            className={"flex flex-row items-center justify-center gap-6"}
            color={"whiteAlpha.700"}
          >
            <button aria-label={"expand-broadcast"} onClick={() => onFullScreen(index)}>
              {isMaximized ? <ExitFullScreenIcon /> : <FullScreenIcon />}
            </button>
            <RemoveBroadcastLink broadcasterLogin={broadcaster_login} />
          </div>
        </div>
        <TwitchPlayer broadcasterLogin={broadcaster_login} />
      </div>
    </div>
  );
};

const StreamsFilter = ({
  isSelecting,
  closeSelect,
  newUrl,
  selectAction,
}: {
  isSelecting: boolean;
  closeSelect: () => void;
  newUrl: string;
  selectAction: SelectAction;
}) => {
  return (
    <>
      {isSelecting && (
        <div className={"absolute right-0 top-2 flex flex-row items-center justify-center gap-2"}>
          <CancelSelectController onClick={closeSelect}>
            <CloseIcon size={"10px"} />
          </CancelSelectController>
          <ConfirmSelectController route={newUrl}>
            <ConfirmSelectControllerIcon selectAction={selectAction} size={"12px"} />
          </ConfirmSelectController>
        </div>
      )}
    </>
  );
};

export default StreamsGrid;
