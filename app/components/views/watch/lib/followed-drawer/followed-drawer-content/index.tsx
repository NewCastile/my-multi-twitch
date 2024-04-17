"use client";
import { ChangeEvent, useState } from "react";

import { CloseIcon } from "@/app/components/icons/close-icon";
import useSearchFollowed from "@/app/hooks/use-search-followed";
import useSelectBroadcasts from "@/app/hooks/use-select-broadcasts";

import SearchFilterButton from "../../search-drawer/search-drawer-content/lib/search-filter-button";
import CancelSelectController from "../../shared/cancel-select-controller";
import ConfirmSelectController, {
  ConfirmSelectControllerIcon,
} from "../../shared/confirm-select-controller";

import Followeds from "./followeds";
import { FollowedDrawerPagination } from "./lib/followed-drawer-pagination";
import FollowedDrawerInput from "./lib/followed-input";

const FollowedDrawerContent = () => {
  const {
    selectState: { newUrl, selectedBroadcasts, isSelecting, selectAction },
    selectHandlers: { closeSelectHandler },
  } = useSelectBroadcasts({ selectAction: "add" });

  const [query, setQuery] = useState<string>("");
  const [liveOnly, setLiveOnly] = useState<boolean>(false);

  const { shownFolloweds, paginationState, paginationHandlers } = useSearchFollowed({
    query,
    liveOnly,
  });

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
              <CancelSelectController onClick={closeSelectHandler}>
                <CloseIcon size={"0.6rem"} />
              </CancelSelectController>
              <ConfirmSelectController route={newUrl}>
                <ConfirmSelectControllerIcon selectAction={selectAction} size={"0.6rem"} />
              </ConfirmSelectController>
            </>
          )}
        </div>
        <Followeds {...{ followeds: shownFolloweds }} />
        <FollowedDrawerPagination
          {...{
            paginationState,
            paginationHandlers,
          }}
        />
      </div>
    </div>
  );
};

export default FollowedDrawerContent;
