import { ChangeEvent } from "react";

const FollowedDrawerInput = ({
  onChangeHandler,
}: {
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      className={
        "block w-full rounded-md border-2 border-monokai-bg-contrast bg-inherit px-2 py-1 outline-none placeholder:text-monokai-bg-contrast focus:border-monokai-red-light focus:ring-monokai-red-light active:border-monokai-red-light active:ring-monokai-red-light"
      }
      placeholder={"Search..."}
      type={"text"}
      onChange={onChangeHandler}
    />
  );
};

export default FollowedDrawerInput;
