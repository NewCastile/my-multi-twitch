interface PaginationStateVariables {
  hasNoFollowedChannels: boolean;
  hasNextPage: boolean;
  allFollowedsShown: boolean;
}

interface PaginationHandlers {
  nextPageButtonOnClickHandler: () => void;
  prevPageButtonOnClickHandler: () => void;
}

export const FollowedDrawerPagination = ({
  paginationHandlers,
  paginationState,
}: {
  paginationState: PaginationStateVariables;
  paginationHandlers: PaginationHandlers;
}) => {
  const { hasNoFollowedChannels, hasNextPage, allFollowedsShown } = paginationState;

  const { nextPageButtonOnClickHandler, prevPageButtonOnClickHandler } = paginationHandlers;

  return (
    <>
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
    </>
  );
};
