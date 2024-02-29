import { redirect } from "next/navigation";

import { INITIAL_PAGE_ROUTE } from "@/constants";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!user || !session) {
    return redirect("/login");
  } else {
    return redirect(`${INITIAL_PAGE_ROUTE}`);
  }
}
