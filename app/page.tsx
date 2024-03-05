import { redirect } from "next/navigation";

import { INITIAL_PAGE_ROUTE } from "@/constants";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  } else {
    return redirect(`${INITIAL_PAGE_ROUTE}`);
  }
}
