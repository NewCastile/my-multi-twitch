import { Metadata } from "next";

import WatchPageLayout from "@/app/components/views/watch/layout";

export const metadata: Metadata = {
  title: "My Multi-Twitch - Watch",
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return <WatchPageLayout>{children}</WatchPageLayout>;
};

export default Layout;
