import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

const LogoutButton = async () => {
  const signOut = async () => {
    "use server";

    const supabase = await createClient();

    await supabase.auth.signOut();

    return redirect("/login");
  };

  return (
    <form action={signOut}>
      <button className={"btn-md btn-monokai-red capitalize font-bold"}>Logout</button>
    </form>
  );
};

export default LogoutButton;
