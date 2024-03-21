"use client";

const SearchBackButton = ({ onClickHandler }: { onClickHandler: () => void }) => {
  return (
    <button
      aria-label={"collapse-search"}
      className={"btn-sm bg-monokai-bg-secondary text-xs font-bold uppercase"}
      tabIndex={-1}
      onClick={onClickHandler}
    >
      Show less
    </button>
  );
};

export default SearchBackButton;
