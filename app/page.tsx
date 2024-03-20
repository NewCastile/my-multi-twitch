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
    const { data: profiles } = await supabase.from("profiles").select("*").eq("id", user.id);

    if (!profiles)
      return <HomeView {...{ message: "No profile for this user was found ", status: "400" }} />;
    const [profile] = profiles;

    if (!profile)
      return <HomeView {...{ message: "No profile for this user was found ", status: "400" }} />;

    const { last_visited } = profile;

    redirect(last_visited ? `/watch${last_visited}` : "/watch");
  }

  const { message, status } = searchParams;

  return <HomeView {...{ message, status }} />;
}
