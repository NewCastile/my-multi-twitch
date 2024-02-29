"use client";

const WatchPageLoadingView = () => {
  return (
    <div
      className={"animate-pulse flex w-full flex-row items-start justify-center text-monokai-white"}
      role={"status"}
    >
      <div className={"flex w-full flex-row items-start justify-center px-6 py-4"}>
        <div className={"flex h-max w-full space-y-4 flex-col items-start justify-center"}>
          <div className={"flex w-full flex-row items-center justify-between pr-4"}>
            <div className={"flex flex-row space-x-6"}>
              <div className={"h-[40px] w-[60px] bg-monokai-bg-contrast"} />
              <div className={"h-[40px] w-[60px] bg-monokai-bg-contrast"} />
            </div>
            <div className={"h-[40px] w-[60px] bg-monokai-bg-contrast"} />
          </div>
          <div className={"grid-cols-2 grid w-full gap-4 pr-4"}>
            {Array(5)
              .fill(0)
              .map((_, idx) => {
                return <div key={idx} className={"h-[240px] w-full bg-monokai-bg-contrast"} />;
              })}
          </div>
        </div>
        <div className={"sticky top-4 h-[600px] w-[30vw] bg-monokai-bg-contrast"} />
      </div>
      <span className={"sr-only"}>Loading...</span>
    </div>
  );
};

export default WatchPageLoadingView;
