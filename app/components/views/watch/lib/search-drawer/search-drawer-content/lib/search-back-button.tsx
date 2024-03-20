"use client";

const SearchBackButton = ({ onClickHandler }: { onClickHandler: () => void }) => {
  return (
    <button
      aria-label={"collapse-search"}
      className={"btn-sm bg-monokai-red-light text-xs font-bold uppercase text-black"}
      tabIndex={-1}
      onClick={onClickHandler}
    >
      Show less
    </button>
  );
};

export default SearchBackButton;
