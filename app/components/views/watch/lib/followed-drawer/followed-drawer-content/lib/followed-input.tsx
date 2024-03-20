import { ChangeEvent, useContext, useMemo } from "react";

import { FollowedDrawerContext } from "@/app/context/drawers";

const FollowedDrawerInput = ({
  onChangeHandler,
}: {
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const context = useContext(FollowedDrawerContext);

  const disabled = useMemo(() => {
    if (context && context.drawer) {
      return context.drawer.isVisible();
    } else {
      return false;
    }
  }, [context]);

  return (
    <input
      className={
        disabled
          ? "block w-full cursor-not-allowed rounded-md border-2 border-monokai-bg-contrast bg-inherit px-2 py-1 outline-none placeholder:text-monokai-bg-contrast"
          : "block w-full rounded-md border-2 border-monokai-bg-contrast bg-inherit px-2 py-1 outline-none placeholder:text-monokai-bg-contrast focus:border-monokai-red-light focus:ring-monokai-red-light active:border-monokai-red-light active:ring-monokai-red-light"
      }
      disabled={disabled}
      placeholder={"Search..."}
      onChange={onChangeHandler}
    />
  );
};

export default FollowedDrawerInput;
