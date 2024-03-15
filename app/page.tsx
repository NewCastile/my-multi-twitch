import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import HomeView from "./components/views/home";

export default async function Index({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined | null };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/watch");
  }

  const { message, status } = searchParams;

  return <HomeView {...{ message, status }} />;
}
