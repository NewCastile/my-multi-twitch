"use client";

const SearchFilterButton = ({
  disabled = false,
  isActive,
  onClickHandler,
  children,
}: {
  disabled?: boolean;
  isActive?: boolean;
  onClickHandler: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      className={
        isActive
          ? "btn-sm bg-monokai-green-light text-black"
          : "btn-sm bg-monokai-red-light text-black"
      }
      disabled={disabled}
      tabIndex={-1}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};

export default SearchFilterButton;
