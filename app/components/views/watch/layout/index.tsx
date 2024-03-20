import Footer from "./lib/footer";
import Header from "./lib/header";

const WatchPageLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={"flex h-screen w-full flex-col items-center justify-center gap-6 overflow-auto"}
    >
      <Header />
      <div className={"flex w-full flex-col items-center justify-start overflow-y-auto"}>
        <div className={"h-max w-full"}>
          <div className={"h-max min-h-screen"}>{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default WatchPageLayout;
