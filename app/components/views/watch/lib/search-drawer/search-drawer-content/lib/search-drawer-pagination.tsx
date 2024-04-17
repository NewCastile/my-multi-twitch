import { SpinnerIcon } from "@/app/components/icons/spinner-icon";

import SearchBackButton from "./search-back-button";
import SearchNextButton from "./search-next-button";

interface PaginationState {
  isOnFirstPage: boolean;
  hasPagination: boolean;
  pageToken: number;
}

interface PaginationHandlers {
  nextButtonOnClickHandler: () => void;
  prevButtonOnClickHandler: () => void;
}

interface SearchState {
  isLoading: boolean;
  isFetching: boolean;
}

export const SearchDrawerPagination = ({
  searchState,
  paginationState,
  paginationHandlers,
}: {
  searchState: SearchState;
  paginationState: PaginationState;
  paginationHandlers: PaginationHandlers;
}) => {
  const { isLoading, isFetching } = searchState;
  const { pageToken, hasPagination, isOnFirstPage } = paginationState;
  const { nextButtonOnClickHandler, prevButtonOnClickHandler } = paginationHandlers;

  return (
    <div className={"flex w-full flex-col items-center justify-center"}>
      {isLoading || isFetching ? (
        <SpinnerIcon />
      ) : pageToken && hasPagination ? (
        <div className={"flex w-full flex-row items-center justify-between"}>
          <SearchNextButton onClickHandler={nextButtonOnClickHandler} />
          {!isOnFirstPage && <SearchBackButton onClickHandler={prevButtonOnClickHandler} />}
        </div>
      ) : null}
    </div>
  );
};
