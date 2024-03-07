import { redirect } from "next/navigation";

import { INITIAL_PAGE_ROUTE } from "@/constants";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, last_visited")
    .eq("id", user.id);

  if (!profiles) {
    redirect("/login");
  }

  const [profile] = profiles;

  if (!profile) {
    redirect("/login");
  }

  const { last_visited } = profile;

  if (!last_visited) {
    redirect("/watch");
  }

  redirect(last_visited);
}
