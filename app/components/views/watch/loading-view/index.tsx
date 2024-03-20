"use client";

const WatchPageLoadingView = () => {
  return (
    <div
      className={"flex w-full animate-pulse flex-row items-start justify-center text-monokai-white"}
      role={"status"}
    >
      <div className={"flex w-full flex-row items-start justify-center gap-6 px-6"}>
        <div className={"flex h-max w-full flex-col items-start justify-center gap-4"}>
          <div className={"flex flex-row gap-6 py-2"}>
            <div className={"h-[35px] w-[64px] bg-monokai-bg-contrast"} />
            <div className={"h-[35px] w-[64px] bg-monokai-bg-contrast"} />
          </div>
          <div className={"grid w-full grid-cols-2 gap-4"}>
            {Array(5)
              .fill(0)
              .map((_, idx) => {
                return <div key={idx} className={"h-[300px] w-full bg-monokai-bg-contrast"} />;
              })}
          </div>
        </div>
        <div className={"sticky top-4 h-[600px] w-[37vw] bg-monokai-bg-contrast"} />
      </div>
      <span className={"sr-only"}>Loading...</span>
    </div>
  );
};

export default WatchPageLoadingView;
