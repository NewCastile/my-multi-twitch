import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = await createClient();

    await supabase.auth.signOut();

    return redirect("/login");
  };

  return user ? (
    <div className={"flex items-center gap-4"}>
      Hey, {user.email}!
      <form action={signOut}>
        <button
          className={
            "px-4 py-2 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
          }
        >
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      className={
        "flex px-3 py-2 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
      }
      href={"/login"}
    >
      Login
    </Link>
  );
}
