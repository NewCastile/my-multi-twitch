"use client";

const SearchNextButton = ({ onClickHandler }: { onClickHandler: () => void }) => {
  return (
    <button
      aria-label={"expand-search"}
      className={"btn-sm bg-monokai-bg-secondary text-xs font-bold uppercase"}
      tabIndex={-1}
      onClick={onClickHandler}
    >
      Show more
    </button>
  );
};

export default SearchNextButton;
