import { SignInButton } from "@/app/components/views/home/lib/sign-in-button";
import { createClient } from "@/utils/supabase/server";

import LogoutButton from "./logout-button";

const Header = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div
      className={
        "flex w-full flex-row items-center justify-between bg-monokai-bg-secondary px-5 py-3"
      }
    >
      <div>
        <p className={"font-mono text-3xl font-black uppercase text-monokai-white"}>
          My Multi-Twitch
        </p>
      </div>
      {user ? (
        <LogoutButton
          className={"btn-md btn-monokai-black inline-flex gap-2 text-sm font-bold uppercase"}
        >
          logout
        </LogoutButton>
      ) : (
        <SignInButton
          className={
            "btn-sm btn-monokai-black inline-flex w-max flex-row items-center justify-center gap-2 px-4 text-sm font-bold uppercase"
          }
        >
          Sign in with Twitch
        </SignInButton>
      )}
    </div>
  );
};

export default Header;
