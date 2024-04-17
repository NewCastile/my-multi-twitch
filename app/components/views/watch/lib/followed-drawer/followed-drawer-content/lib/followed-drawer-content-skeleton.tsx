export const FollowedDrawerContentSkeleton = () => {
  return (
    <ul
      className={
        "flex size-full animate-pulse flex-col items-center justify-center divide-y-2 overflow-y-auto overflow-x-hidden px-4 pb-4"
      }
    >
      {Array(4)
        .fill("")
        .map((_, idx) => {
          return <FolllowedStreamItemSkeleton key={idx} />;
        })}
    </ul>
  );
};

const FolllowedStreamItemSkeleton = () => {
  return (
    <li
      className={
        "flex w-full flex-col items-center justify-center gap-3 py-4 text-xs font-medium uppercase"
      }
    >
      <div
        className={
          "flex h-6 w-full flex-row items-center justify-between gap-2 rounded-md bg-monokai-bg-contrast text-left"
        }
      />
      <div className={"h-[112px] w-[200px] rounded-md bg-monokai-bg-contrast"} />
      <div className={"h-[1rem] w-full rounded-md bg-monokai-bg-contrast"} />
      <div
        className={
          "flex h-2.5 w-full flex-row items-center justify-center rounded-md bg-monokai-bg-contrast"
        }
      />
    </li>
  );
};
