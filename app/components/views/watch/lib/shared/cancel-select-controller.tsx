"use client";

const CancelSelectController = ({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      aria-label={"cancel-select"}
      className={`rounded-full border-2 border-monokai-bg-contrast bg-inherit p-2`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CancelSelectController;
