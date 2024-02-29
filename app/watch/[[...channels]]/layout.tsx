import WatchPageLayout from "@/app/components/views/watch/layout";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return <WatchPageLayout>{children}</WatchPageLayout>;
};

export default Layout;
