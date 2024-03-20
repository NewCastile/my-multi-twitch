import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import NotFoundView from "./components/views/not-found";

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
