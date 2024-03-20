const SelectBroadcastButton = ({
  isSelected,
  onClickHandler,
}: {
  isSelected: boolean;
  onClickHandler: () => void;
}) => {
  return (
    <button
      aria-label={"select-broadcast"}
      className={`size-6 ${
        isSelected
          ? "border-monokai-white bg-monokai-red-primary"
          : "border-monokai-bg-contrast bg-inherit"
      } rounded-full border-2 `}
      tabIndex={-1}
      onClick={onClickHandler}
    />
  );
};

export default SelectBroadcastButton;
