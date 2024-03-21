"use client";

import { ChangeEvent, KeyboardEvent, useContext, useMemo } from "react";

import { SearchIcon } from "@/app/components/icons/search-icon";
import { SearchDrawerContext } from "@/app/context/drawers";

const SearchInput = ({
  value,
  onChangeHandler,
  onKeyUpHandler,
  buttonOnClickHandler,
}: {
  value: string;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyUpHandler: (e: KeyboardEvent<HTMLInputElement>) => void;
  buttonOnClickHandler: () => void;
}) => {
  const context = useContext(SearchDrawerContext);
  const disabled = useMemo(() => {
    return context ? context.isHidden : true;
  }, [context]);

  return (
    <div className={"relative flex w-full flex-col items-center justify-center"}>
      <input
        className={
          disabled
            ? "block w-full cursor-not-allowed rounded-md border-2 border-monokai-bg-contrast bg-inherit px-2 py-1 outline-none placeholder:text-monokai-bg-contrast focus:border-monokai-red-light focus:ring-monokai-red-light active:border-monokai-red-light active:ring-monokai-red-light"
            : "block w-full rounded-md border-2 border-monokai-bg-contrast bg-inherit px-2 py-1 outline-none placeholder:text-monokai-bg-contrast focus:border-monokai-red-light focus:ring-monokai-red-light active:border-monokai-red-light active:ring-monokai-red-light"
        }
        disabled={disabled}
        placeholder={"Search a streamer"}
        type={"text"}
        value={value}
        onChange={(e) => onChangeHandler(e)}
        onKeyUp={(e) => onKeyUpHandler(e)}
      />
      <div className={"absolute right-4 flex items-center"}>
        <button tabIndex={-1} onClick={buttonOnClickHandler}>
          <SearchIcon />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
