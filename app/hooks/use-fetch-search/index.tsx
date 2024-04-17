import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";

import { SEARCH_ITEMS_PER_PAGE } from "@/constants";
import { useLazySearchBroadcastQuery } from "@/lib/features/search/search-api-slice";
import {
  goToNextPage,
  goToPrevPage,
  loadNextPage,
  loadSearch,
  resetChannelSearch,
} from "@/lib/features/search/search-channels-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { FilterKey } from "@/types";
import { isSearchChannelsResponse } from "@/utils/type-guards";

export const useFetchSearch = () => {
  const dispatch = useAppDispatch();
  const dispatchRef = useRef(dispatch);

  const { accessToken } = useAppSelector((state) => state.accessToken);
  const { shownChannels, channels, pageToken } = useAppSelector((state) => state.searchChannels);

  const [triggerNextSearch, { data, isError, isLoading, isFetching, originalArgs }] =
    useLazySearchBroadcastQuery();

  const [query, setQuery] = useState("");
  const [liveOnly, setLiveOnly] = useState(false);

  const isOnFirstPage = useMemo(() => {
    return pageToken === SEARCH_ITEMS_PER_PAGE;
  }, [pageToken]);

  useEffect(() => {
    if (!data || !isSearchChannelsResponse(data)) return;
    if (typeof originalArgs?.after === "string") {
      dispatch(loadNextPage(data.data));

      return;
    }
    dispatchRef.current(loadSearch(data.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    dispatchRef.current(resetChannelSearch());
  }, [liveOnly]);

  const searchButtonOnClickHandler = () => {
    if (!query) return;

    triggerNextSearch({
      broadcasterName: query,
      liveOnly,
      accessToken,
    });
  };

  const hasPagination = useMemo(() => {
    if (!data) return false;
    if ("message" in data) return false;
    if (!isSearchChannelsResponse(data)) return false;
    if (!data.pagination.cursor) {
      return false;
    } else {
      return true;
    }
  }, [data]);

  const nextButtonOnClickHandler = () => {
    if (!query) return;
    if (pageToken && shownChannels.length < channels.length) {
      dispatch(goToNextPage());

      return;
    }
    if (pageToken && data && isSearchChannelsResponse(data)) {
      triggerNextSearch({
        broadcasterName: query,
        liveOnly,
        accessToken,
        after: data.pagination.cursor,
      });
    }
  };

  const prevButtonOnClickHandler = () => dispatch(goToPrevPage());

  const searchInputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

  const searchInputOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchButtonOnClickHandler();
    }
  };

  const changeSearchFilter = (filterKey: FilterKey) => {
    switch (filterKey) {
      case "ALL":
        () => setLiveOnly(false);
        break;
      case "LIVE_ONLY":
        () => setLiveOnly(true);
        break;
      default:
        () => setLiveOnly(false);
        break;
    }
  };

  const paginationHandlers = {
    nextButtonOnClickHandler,
    prevButtonOnClickHandler,
    searchInputOnChangeHandler,
    searchInputOnKeyUpHandler,
  };
  const searchFilterHandlers = { changeSearchFilter };
  const fetchState = {
    data,
    isError,
    isLoading,
    isFetching,
  };

  const paginationState = {
    hasPagination,
    isOnFirstPage,
    pageToken,
  };

  const queryState = {
    query,
    liveOnly,
  };

  return {
    shownChannels,
    fetchState,
    paginationState,
    queryState,
    paginationHandlers,
    searchFilterHandlers,
  };
};
