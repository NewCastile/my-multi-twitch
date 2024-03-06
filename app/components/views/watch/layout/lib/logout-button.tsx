import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

const LogoutButton = async () => {
  const signOut = async () => {
    "use server";

    const supabase = createClient();

    await supabase.auth.signOut();

    redirect("/login");
  };

  return (
    <form action={signOut}>
      <button className={"btn-md btn-monokai-red font-bold capitalize"}>Logout</button>
    </form>
  );
};

export default LogoutButton;
