"use client";

import { useFetchSearch } from "@/app/hooks/use-fetch-search";

import SearchChannelResultItem from "./lib/search-channel-result-item";
import { SearchDrawerPagination } from "./lib/search-drawer-pagination";
import SearchFilterButton from "./lib/search-filter-button";
import SearchInput from "./lib/search-input";

const SearchDrawerContent = () => {
  const {
    shownChannels,
    fetchState,
    queryState,
    paginationState,
    searchFilterHandlers,
    paginationHandlers,
  } = useFetchSearch();

  const { data, isLoading, isError, isFetching } = fetchState;

  const { hasPagination, isOnFirstPage, pageToken } = paginationState;
  const { query, liveOnly } = queryState;

  const {
    nextButtonOnClickHandler,
    prevButtonOnClickHandler,
    searchInputOnChangeHandler,
    searchInputOnKeyUpHandler,
  } = paginationHandlers;

  const { changeSearchFilter } = searchFilterHandlers;

  return (
    <div
      className={"flex size-full flex-col items-center justify-start gap-5 overflow-y-hidden px-4"}
    >
      <div className={"flex flex-row items-center justify-center gap-2"}>
        <SearchFilterButton
          disabled={isFetching || isLoading}
          isActive={!liveOnly}
          onClickHandler={() => changeSearchFilter("ALL")}
        >
          All
        </SearchFilterButton>
        <SearchFilterButton
          disabled={isFetching || isLoading}
          isActive={liveOnly}
          onClickHandler={() => changeSearchFilter("LIVE_ONLY")}
        >
          Live only
        </SearchFilterButton>
      </div>
      <SearchInput
        buttonOnClickHandler={() => nextButtonOnClickHandler()}
        value={query}
        onChangeHandler={(e) => searchInputOnChangeHandler(e)}
        onKeyUpHandler={(e) => searchInputOnKeyUpHandler(e)}
      />
      {isError ? (
        <p>An error has ocurred 😕. Please try again or reload the page</p>
      ) : !data ? null : "message" in data ? (
        <div className={"flex w-full flex-col items-center justify-center"}>
          <p className={"w-full text-center"}>Something wrong happened :c</p>
          <p>Try again</p>
        </div>
      ) : (
        <ul
          className={
            "flex w-full flex-col items-start justify-start divide-y-2 divide-monokai-bg-contrast overflow-y-auto overflow-x-hidden"
          }
        >
          {shownChannels.map((matchingChannel, matchingChannelIdx) => {
            return (
              <SearchChannelResultItem key={matchingChannelIdx} matchingChannel={matchingChannel} />
            );
          })}
        </ul>
      )}
      <SearchDrawerPagination
        {...{
          searchState: { isFetching, isLoading },
          paginationState: { hasPagination, isOnFirstPage, pageToken },
          paginationHandlers: { nextButtonOnClickHandler, prevButtonOnClickHandler },
        }}
      />
    </div>
  );
};

export default SearchDrawerContent;
