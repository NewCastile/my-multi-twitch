import { Metadata } from "next";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import NotFoundView from "./components/views/not-found";

export const metadata: Metadata = {
  title: "My Multi-Twitch - Error",
};

const NotFound = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return <NotFoundView />;
};

export default NotFound;
