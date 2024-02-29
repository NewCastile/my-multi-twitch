const SelectBroadcastButton = ({
  isSelected,
  onClickHandler,
}: {
  isSelected: boolean;
  onClickHandler: () => void;
}) => {
  return (
    <button
      className={`h-6 w-6 ${
        isSelected
          ? "border-monokai-white bg-monokai-red-primary"
          : "border-monokai-bg-contrast bg-inherit"
      } rounded-full border-2 `}
      onClick={onClickHandler}
    />
  );
};

export default SelectBroadcastButton;
