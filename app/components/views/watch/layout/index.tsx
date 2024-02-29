import Footer from "./lib/footer";
import Header from "./lib/header";

const WatchPageLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={"flex h-screen w-full flex-col items-center overflow-auto justify-center"}>
      <Header />
      <div className={"w-full flex flex-col items-center justify-start overflow-y-auto"}>
        <div className={"w-full h-max"}>
          <div className={"min-h-screen h-max"}>{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default WatchPageLayout;
