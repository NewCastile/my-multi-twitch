"use client";

const SearchNextButton = ({ onClickHandler }: { onClickHandler: () => void }) => {
  return (
    <button
      aria-label={"expand-search"}
      className={"btn-sm bg-monokai-red-light text-xs font-bold uppercase text-black"}
      tabIndex={-1}
      onClick={onClickHandler}
    >
      Show more
    </button>
  );
};

export default SearchNextButton;
