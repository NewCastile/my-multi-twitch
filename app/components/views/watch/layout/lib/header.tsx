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
        "flex w-full flex-row items-center justify-between border-t-8 border-t-monokai-orange bg-monokai-bg-contrast px-5 py-3"
      }
    >
      <div>
        <p className={"font-mono text-3xl font-black uppercase text-monokai-white"}>
          My Multi-Twitch
        </p>
      </div>
      {user ? (
        <LogoutButton />
      ) : (
        <SignInButton
          className={
            "btn-sm btn-monokai-violet inline-flex flex-row items-center justify-center gap-2 text-sm font-bold uppercase"
          }
        />
      )}
    </div>
  );
};

export default Header;
